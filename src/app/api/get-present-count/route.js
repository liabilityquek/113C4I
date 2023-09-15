import { fetchDriverCount } from '@/lib/getDashboardCount'
import path from 'path';

const folderName = path.basename(path.dirname(__filename))
const extractFileName = folderName.replace('get-','').replace('-count','').toUpperCase();

export async function GET() {
    return await fetchDriverCount(extractFileName)
}