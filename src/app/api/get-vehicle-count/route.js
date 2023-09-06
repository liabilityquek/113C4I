import { NextResponse } from "next/server";
import prisma from '@/app/config/database';


export async function GET(request) {
    try {
        const countVehicle = await prisma.Vehicle.count()
        return new NextResponse (countVehicle > 0 ? countVehicle : 0)
    } catch (e) {
        return NextResponse.error(`Error getting vehicles count: ${e}`);
    }
}