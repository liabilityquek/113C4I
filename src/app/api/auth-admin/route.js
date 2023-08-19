import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request) {
  try {
    const users = await prisma.User.findMany({
      select: { 
        name: true
       },
    });

    if(users){
      return new NextResponse(JSON.stringify(users));
    }
  } catch (e) {
    return NextResponse.error(`Error getting users: ${e}`);
  }
}
