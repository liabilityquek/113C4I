import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request) {
    try {
        const vehs = await prisma.Vehicle.findMany({
            include:{
                to: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (vehs.length > 0) {
            return new NextResponse(JSON.stringify(vehs, null, 2));
        } else {
            return new NextResponse.JSON({ message: "No vehicles found" });
        }
    } catch (e) {
        return NextResponse.error(`Error getting vehicle/s: ${e}`);
    }
}
