import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request) {
    try {
        const url = new URL(request.url);
        console.log(`url: ${url}`)
        const page = parseInt(url.searchParams.get("page")); // default to page 1 if not provided
        console.log(`page: ${page}`)
        const pageSize = parseInt(url.searchParams.get("pageSize")) // default to 5 items per page if not provided
        console.log(`pageSize: ${pageSize}`)
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

        if (drivers.length > 0) {
            return new NextResponse(JSON.stringify(drivers, null, 2));
        } else {
            return new NextResponse.JSON({ message: "No drivers found" });
        }
    } catch (e) {
        return NextResponse.error(`Error getting drivers: ${e}`);
    }
}
