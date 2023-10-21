import { NextResponse } from "next/server";
import { getAllDrivers } from '@/lib/drivers'


export async function GET(request){
    const query = request.nextUrl.searchParams.get('query').toLowerCase();
    const response = await getAllDrivers();

    // Check if response.drivers is an array before filtering
    if (!response || !Array.isArray(response.drivers)) {
        // Handle the error accordingly
        console.error("Error: Expected drivers to be an array but received:", response);
        return NextResponse.json({ error: "Failed to retrieve drivers." });
    }

    const filteredDrivers = response.drivers.filter(driver => {
        return Object.values(driver).some(value => {
            if (typeof value === "string") {
                return value.toLowerCase().includes(query);
            }
            return false;
        });
    });

    // Return the filtered drivers within the same structure
    return NextResponse.json({ 
        pageCount: response.pageCount, 
        drivers: filteredDrivers 
    });
}