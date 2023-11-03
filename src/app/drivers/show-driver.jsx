'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import { Card, Flex, Grid } from '@tremor/react';
import Pagination from '@/components/Pagination'
import SearchBox from '@/components/searchbox.component';
import DriverCards from './driver-cards'

const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export default function ShowDrivers({ drivers, isAdmin, userId }) {
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchDriver, setSearchDriver] = useState([])
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (!searchQuery) return;
        setLoading(true);
        (async () => {
            try {
                const response = await fetch(`${NEXT_PUBLIC_NEXTAUTH_URL}/api/search-driver?query=` + encodeURIComponent(searchQuery));
                const data = await response.json();
                // console.log(`data: ${JSON.stringify(data, null, 2)}`)
                setSearchDriver(data.drivers);
            } catch (err) {
                console.error(`Error loading this page: ${err}`);
            } finally {
                setLoading(false); 
            }
        })();
    }, [searchQuery]);

    return (
        <>
            <div className="flex justify-center items-center mt-5">
                    <SearchBox onSearch={setSearchQuery}/>
            </div>

            {loading ? (
                 <div className="flex justify-center items-center mt-5">
                    Loading...
                </div>

            ) :          
            (
                searchQuery ? (
                    <main className="p-4 md:p-10 mx-auto max-w-7xl">
                        {searchDriver && searchDriver.length > 0 ? (
                            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                                {searchDriver.map((driver, index) => (
                                    <DriverCards key={driver.id} driver={driver} index={index} isAdmin={isAdmin} />
                                ))}
                            </Grid>
                        ) : 'Nothing to show...'}
                    </main>
                ) : (
                    <main className="p-4 md:p-10 mx-auto max-w-7xl">
                        {drivers && drivers.length > 0 ? (
                            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                                {drivers.map((driver, index) => (
                                    <DriverCards key={driver.id} driver={driver} index={index} isAdmin={isAdmin} />
                                ))}
                            </Grid>
                        ) : 'Nothing to show...'}
                    </main>
                )
            )}
            {/* <Pagination page={page} pageCount={pageCount} href='/drivers'/> */}
        </>
    );
}