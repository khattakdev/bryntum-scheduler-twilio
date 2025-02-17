import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'components/data.json');

export async function GET() {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const scheduler = JSON.parse(data);
   
    return Response.json(scheduler);
}