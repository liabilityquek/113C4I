import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function fetchVehicleCount(request) {
    try {
        const count = await prisma.Vehicle.count({
            where: {
                veh_type: request
            }
        })
        return new NextResponse (count > 0 ? count : 0)
    } catch (e) {
        return NextResponse.error(`Error getting vehicle count: ${e}`);
    }
}

export async function fetchDriverCount(request) {
    try {
        const count = await prisma.TO.count({
            where: {
                availability: request
            }
        })
        return new NextResponse (count > 0 ? count : 0)
    } catch (e) {
        return NextResponse.error(`Error getting driver count: ${e}`);
    }
}