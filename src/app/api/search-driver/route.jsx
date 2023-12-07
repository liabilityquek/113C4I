import { NextResponse } from "next/server";

export async function GET(request){
    try{

        const query = request.nextUrl.searchParams.get('query').toLowerCase();
        const page = parseInt(request.nextUrl.searchParams.get('page'))
        const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize'))
        const skip = (page - 1) * pageSize
        
        const filteredDriverCount = await prisma.TO.count({
            where:{
                name: { contains: query }
            }
        })

        const drivers = await prisma.TO.findMany({
            where: {
                name: { contains: query }
            },
            skip: skip,
            take: pageSize,
            orderBy: [
                { name: 'asc' },
                { availability: 'desc' }
            ]
        })


        
        if(filteredDriverCount > 0) {
            return new NextResponse(JSON.stringify({ drivers, filteredDriverCount }));
        } else {
            return new NextResponse.JSON({ message: "No drivers found" });
        }
    } catch(e){
        return NextResponse.error(`Error getting drivers: ${e}`);
    }
    
}