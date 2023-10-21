import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(req, { params }) {
    try {
        const driver = await prisma.TO.findUnique({
            where: {
                name: params.name
            }
        })
  
      if (!driver) {
        return new NextResponse.JSON({ message: "No driver found" });
      }

      return new NextResponse(JSON.stringify(driver, null, 2));

    } catch (error) {
        return NextResponse.error(`Error getting driver: ${error}`);
    }
  }
