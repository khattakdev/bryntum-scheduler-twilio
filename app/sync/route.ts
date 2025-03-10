import { AssignmentModel,} from '@bryntum/scheduler';
import { Dependency, Event, Assignment, Resource } from '../../models/index'
import { SyncResponse, TableChangeType, OperationType, CustomModel } from './type';

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

function updateOperation(updated : OperationType, table : string) {
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
            }
            if (table === 'resources') {
                await Resource.update(data, { where : { id } });
            }
        })
    );
}

function deleteOperation(deleted : OperationType, table : string) {
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
                await Event.destroy({
                    where : {
                        id : id
                    }
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

function createOperation(added : OperationType , table : string) {
    return Promise.all(
        added.map(async(record) => {
            const { $PhantomId, ...data } = record as CustomModel;
            let id;
            // Insert record into the table.rows array
            if (table === 'assignments') {
                const assignment = await Assignment.create(data);
                id = assignment.id;
            }
            if (table === 'dependencies') {
                const dependency = await Dependency.create(data);
                id = dependency.id;
            }
            if (table === 'events') {
                const event = await Event.create(data);
                id = event.id;
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

// TODO: table to tableName