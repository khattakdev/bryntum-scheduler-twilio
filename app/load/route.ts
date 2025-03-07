import { Dependency, Event, Assignment, Resource } from '../../models/index'

export async function GET() {
    try {
        const assignmentsPromise = Assignment.findAll();
        const dependenciesPromise = Dependency.findAll();
        const eventsPromise = Event.findAll();
        const resourcesPromise = Resource.findAll();
        const [assignments, dependencies, events, resources] = await Promise.all([
            assignmentsPromise,
            dependenciesPromise,
            eventsPromise,
            resourcesPromise
        ]);
        return Response.json({
                assignments  : { rows : assignments },
                dependencies : { rows : dependencies },
                events       : { rows : events },
                resources    : { rows : resources }
            });
    }
    catch (error) {
        console.error({ error });
        return Response.json({
            success : false,
            message :
        'There was an error loading the assignments, dependencies, events, and resources data.'
        });
    }
    // const data = fs.readFileSync(dataFilePath, 'utf8');
    // const scheduler = JSON.parse(data);
   
    // return Response.json(scheduler);
}