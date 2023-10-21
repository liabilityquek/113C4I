import { NextResponse } from "next/server";
import { getAllDrivers } from '@/lib/drivers'

export async function GET(request){
    const query = request.nextUrl.searchParams.get('query');
    const drivers = await getAllDrivers(query);
    return NextResponse.json(drivers)
}