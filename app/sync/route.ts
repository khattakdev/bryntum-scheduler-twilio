import fs from 'fs';
import path from 'path';

// TODO: revert back to data.json and delete post-data.json
const dataFilePath = path.join(process.cwd(), 'components/post-data.json');

export async function POST() {

    const data = fs.readFileSync(dataFilePath, 'utf8');
    const scheduler = JSON.parse(data);
   
    // TODO: Apply the changes before responding
    return Response.json(scheduler);
}