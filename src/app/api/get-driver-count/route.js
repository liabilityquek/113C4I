import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request) {
    try {
        const countDrivers = await prisma.TO.count()
        return new NextResponse (countDrivers > 0 ? countDrivers : 0)
    } catch (e) {
        return NextResponse.error(`Error getting drivers count: ${e}`);
    }
}
