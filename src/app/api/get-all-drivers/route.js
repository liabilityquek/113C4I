import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request) {
    const pageSize = 1;
    const page = request.query || 1

    try {
        const drivers = await prisma.TO.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            include:{
                vehicles:true,
                book_out:true
            },
            orderBy: {
                name: 'asc'
            }
        });

        const totalDriversCount = await prisma.TO.count();
        const lastPage = Math.ceil(totalDriversCount / pageSize); 
        
        if (drivers.length > 0) {
            return new NextResponse(JSON.stringify({ drivers, lastPage }, null, 2));
        } else {
            return new NextResponse.JSON({ message: "No drivers found" });
        }
    } catch (e) {
        return NextResponse.error(`Error getting drivers: ${e}`);
    }
}
