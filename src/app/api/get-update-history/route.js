import { NextResponse } from "next/server";
import prisma from '@/app/config/database';

export async function GET(request, { params }) {
    const { toId } = params
    try {

        const driverUpdates = await prisma.UpdateHistory.findMany({
            where: { toId: Number(toId) },
            select: {
                updatedAt: true,
                afterValues: true,
                beforeValues: true,
                updatedByTo: {
                    select: {
                        name: true
                    },
                },
                updatedByUser: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        if (driverUpdates && driverUpdates.length > 0) {
            const response = driverUpdates.map(update => ({
                updatedAt: update.updatedAt,
                beforeValues: JSON.parse(update?.beforeValues),
                afterValues: JSON.parse(update?.afterValues),
                updateByUserName: update?.updatedByUser?.name,
                updateByToName: update?.updatedByTo?.name

            }));
            return new NextResponse([JSON.stringify(response)]);
        } else {
            return NextResponse(`No updates for this driver`);
        }

    } catch (e) {
        return NextResponse.error(`Error getting updates history: ${e}`);
    }
}

