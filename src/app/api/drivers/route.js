import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request) {
    try {
        const page = parseInt(request.nextUrl.searchParams.get('page')); // default to page 1 if not provided
        const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize')) // default to 5 items per page if not provided
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const drivers = await prisma.TO.findMany({
            skip: skip,
            take: take,
            include: {
                vehicles: true,
                book_out: true
            },
            orderBy: [
                { name: 'asc' },
                { availability: 'desc' }
            ]
        });

        const driversCount = await prisma.TO.count()

        if (drivers.length > 0) {
            return new NextResponse(JSON.stringify({ drivers, driversCount }));
        } else {
            return new NextResponse.JSON({ message: "No drivers found" });
        }
    } catch (e) {
        return NextResponse.error(`Error getting drivers: ${e}`);
    }
}
