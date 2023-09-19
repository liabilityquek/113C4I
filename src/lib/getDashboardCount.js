import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function fetchVehicleCount(request) {
    try {
        const count = await prisma.Vehicle.count({
            where: {
                veh_type: request
            }
        })
        return new NextResponse(count > 0 ? count : 0)
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
        return new NextResponse(count > 0 ? count : 0)
    } catch (e) {
        return NextResponse.error(`Error getting driver count: ${e}`);
    }
}

export async function fetchVehTypeDriverCount(request) {
    try {
        const vehTypeCount = await prisma.vehicle.count({
            where: {
                veh_type: request,
                toId: {
                    not: null,
                }
            }
        });

        return new NextResponse(vehTypeCount > 0 ? vehTypeCount : 0);

    } catch (e) {
        console.error(e);
        return new NextResponse({ content: `Error getting SOUV driver count: ${e.message}` });
    }
}