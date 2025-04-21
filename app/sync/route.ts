import { AssignmentModel,} from '@bryntum/scheduler';
import { Dependency, Event, Assignment, Resource } from '../../models/index'
import { LogType, ActionType, EventInfo, AssignmentInfo, SyncResponse, TableChangeType, OperationType, CustomModel } from './types';
// import twilio from 'twilio';

export async function POST(request: Request) {
    const body = await request.json();
    const { requestId, assignments, dependencies, events, resources } = body;


    const eventMapping: { [key: string]: string | number } = {};

    try {
        const response : SyncResponse = { requestId, success : true };

        if (resources) {
            const rows = await applyTableChanges('resources', resources);
            // if new data to update client
            if (rows) {
                response.resources = { rows };
            }
        }

        if (events) {
            const rows = await applyTableChanges('events', events);
            if (rows) {
                if (events?.added) {
                    rows.forEach((row) => {
                        console.log(row, eventMapping, row.$PhantomId, row.id);
                        eventMapping[row.$PhantomId] = row.id as number;
                        console.log(row, eventMapping, row.$PhantomId, row.id);
                    });
                }
                response.events = { rows };
            }
        }

        if (assignments) {
            if (events && events?.added) {
                assignments.added.forEach((assignment : AssignmentModel) => {
                    assignment.eventId = eventMapping[assignment.eventId];
                });
            }
            const rows = await applyTableChanges('assignments', assignments);
            if (rows) {
                response.assignments = { rows };
            }
        }

        if (dependencies) {
            const rows = await applyTableChanges('dependencies', dependencies);
            if (rows) {
                response.dependencies = { rows };
            }
        }

        return Response.json(response);
    }
    catch (error) {
        console.error({ error });
        return Response.json({
            requestId,
            success : false,
            message : 'There was an error syncing the data changes.'
        });
    }

}

async function updateOperation(updated: OperationType, table: string) {
    // sendNotification(message,resource.dataValues.telNumber);
    // Nathaniel: Send Twilio Message that event was updated to the resource telNumber
    return Promise.all(
        updated.map(async({ id, ...data }) => {
            if (table === 'assignments') {
                await Assignment.update(data, { where : { id } });
            }
            if (table === 'dependencies') {
                await Dependency.update(data, { where : { id } });
            }
            if (table === 'events') {
                await Event.update(data, { where : { id } });
                const eventData = await Event.findOne({ where: { id } });
                logAction('event', 'update', {
                    name: eventData?.name,
                    startDate: eventData?.startDate,
                    endDate: eventData?.endDate
                });
                // console.log(`An event has been updated:\n Event Name: ${eventData?.name}\n Event Start Date: ${eventData?.startDate}\n Event End Date: ${eventData?.endDate}`);
            }
            if (table === 'resources') {
                await Resource.update(data, { where : { id } });
            }
        })
    );
}

function deleteOperation(deleted: OperationType, table: string) {
    // Nathaniel: Send Twilio Message that event was deleted
    return Promise.all(
        deleted.map(async({ id }) => {
            if (table === 'assignments') {
                await Assignment.destroy({
                    where : {
                        id : id
                    }
                });
            }
            if (table === 'dependencies') {
                await Dependency.destroy({
                    where : {
                        id : id
                    }
                });
            }
            if (table === 'events') {
                const eventData = await Event.findOne({ where: { id } });
                await Event.destroy({
                    where : {
                        id : id
                    }
                });
                logAction('event', 'delete', {
                    name: eventData?.name,
                });
            }
            if (table === 'resources') {
                await Resource.destroy({
                    where : {
                        id : id
                    }
                });
            }
        })
    );
}

function createOperation(added: OperationType, table: string) {
    // Nathaniel: Send Twilio Message that event was created
    return Promise.all(
        added.map(async(record) => {
            const { $PhantomId, ...data } = record as CustomModel;
            let id;
            // Insert record into the table.rows array
            if (table === 'assignments') {
                const assignment = await Assignment.create(data);
                id = assignment.id;
                const assignmentData = await Assignment.findOne({ where: { id } });
                const resourceData = await Resource.findOne({ where: { id: assignmentData?.resourceId } });
                const eventData = await Event.findOne({ where: { id: assignmentData?.eventId } });
                logAction('assignment', 'assign', {
                    eventName: eventData?.name,
                    resourceName: resourceData?.name
                });
                }
            if (table === 'dependencies') {
                const dependency = await Dependency.create(data);
                id = dependency.id;
            }
            if (table === 'events') {
                const event = await Event.create(data);
                id = event.id;
                const eventData = await Event.findOne({ where: { id } });
                logAction('event', 'create', {
                    name: eventData?.name,
                    startDate: eventData?.startDate,
                    endDate: eventData?.endDate
                });
            }
            if (table === 'resources') {
                const resource = await Resource.create(data);
                id = resource.id;
            }
            // report to the client that we changed the record identifier
            return { $PhantomId, id };
        })
    );
}

async function applyTableChanges(table : string, changes: TableChangeType) {
    let rows;
    if (changes.added) {
        rows = await createOperation(changes.added, table);
    }
    if (changes.updated) {
        await updateOperation(changes.updated, table);
    }
    if (changes.removed) {
        await deleteOperation(changes.removed, table);
    }
    // if got some new data to update client
    return rows;
}


/*
async function sendNotification(messageBody: string,telNumber: string) {
    // Nathaniel: Send Twilio Message that event was created

    const client = twilio();
    client.messages.create({
        body: messageBody,
        to: telNumber,
        from: '+447482587748'
    });
}
    */



function logAction(type: LogType, action: ActionType, data: EventInfo | AssignmentInfo): void {
    switch (type) {
        case 'event':
            const event = data as EventInfo;
            switch (action) {
                case 'create':
                    console.log(`A new event was created:\n Event Name: ${event.name}\n Event Start Date: ${formatDate(event.startDate)}\n Event End Date: ${formatDate(event.endDate)}`);
                    break;
                case 'update':
                    console.log(`An event has been updated:\n Event Name: ${event.name}\n Event Start Date: ${formatDate(event.startDate)}\n Event End Date: ${formatDate(event.endDate)}`);
                    break;
                case 'delete':
                    console.log(`An event has been deleted:\n Event Name: ${event.name}\n Event Start Date: ${formatDate(event.startDate)}\n Event End Date: ${formatDate(event.endDate)}`);
                    break;
            }
            break;

        case 'assignment':
            const assignment = data as AssignmentInfo;
            switch (action) {
                case 'assign':
                    console.log(`Event "${assignment.eventName}" has been assigned to "${assignment.resourceName}".`);
                    break;
                case 'unassign':
                    console.log(`Resource "${assignment.resourceName}" has been unassigned from "${assignment.eventName}"`);
                    break;
            }
            break;
    }
}

function formatDate(input: Date | undefined): string {
    if (!input) {
        return '';
    }
    const date = new Date(input);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    const day = date.toDateString().split(' ').slice(0, 3).join(' ');
    const monthDay = date.toDateString().split(' ')[2];
    const year = date.getFullYear();
    const time = date.toTimeString().split(' ')[0];

    return `${day} ${monthDay}, ${year} ${time}`;
}

