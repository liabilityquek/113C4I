import { NextResponse } from "next/server";
import prisma from '@/app/config/database';
import { fetchVehTypeDriverCount } from "@/lib/getDashboardCount";
import path from 'path';

const folderName = path.basename(path.dirname(__filename))
const extractFileName = folderName.replace('get-driver-','').replace('-count','').toUpperCase();

export async function GET() {
    return await fetchVehTypeDriverCount(extractFileName)
}
