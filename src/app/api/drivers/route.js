import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request) {
    try {
        const drivers = await prisma.TO.findMany({
            include: {
                vehicles: true,
                book_out: true
            },
            orderBy: [
                { name: 'asc' },
                { availability: 'desc' }
            ]
        });

        if (drivers.length > 0) {
            return new NextResponse(JSON.stringify(drivers, null, 2));
        } else {
            return new NextResponse.JSON({ message: "No drivers found" });
        }
    } catch (e) {
        return NextResponse.error(`Error getting drivers: ${e}`);
    }
}
