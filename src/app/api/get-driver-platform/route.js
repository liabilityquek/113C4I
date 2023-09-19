import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request) {
    try {
        const driversVehiclePlatform = await prisma.Vehicle.count({
            where: {
                toId: {
                    not: null
                }
            }
        });
        return new NextResponse(driversVehiclePlatform > 0 ? driversVehiclePlatform : 0)
    } catch (e) {
        return NextResponse.error(`Error getting driversVehiclePlatform: ${e}`);
    }
}
