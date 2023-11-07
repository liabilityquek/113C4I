'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import { Card, Flex, Grid } from '@tremor/react';
import SearchBox from '@/components/searchbox.component';
import DriverCards from './driver-cards'
import { PageSize, Pagination } from '@/components/Pagination'
import { useSearchParams } from 'next/navigation'
import { getAllDrivers } from '@/lib/drivers'

const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export default function ShowDrivers({ isAdmin, userId }) {
    const [searchQuery, setSearchQuery] = useState(null);
    const [drivers, setDrivers] = useState([])
    const [searchDriver, setSearchDriver] = useState([])
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5)
    const searchParams = useSearchParams()
    const page = searchParams.get('page') || 1

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

    useEffect(() => {
        const fetchDrivers = async () => {
            setLoading(true)
            try{
                const { drivers } = await getAllDrivers(pageSize, page)
                setDrivers(drivers)

            }catch(err){
                console.error(`Error loading this page: ${err}`)
            }finally{
                setLoading(false)
            }
        }
        fetchDrivers()
    }, [])

    return (
        <>
            <div className="flex justify-center items-center mt-5">
                <SearchBox onSearch={setSearchQuery}/>
            </div>
            
            <div className="flex justify-center items-center mt-5">
                <PageSize pageSize={pageSize} setPageSize={setPageSize}/>
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
                        <>
                            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                                {searchDriver.slice((page - 1) * pageSize, page * pageSize).map((driver, index) => (
                                    <DriverCards key={driver.id} driver={driver} index={index} isAdmin={isAdmin} />
                                ))}
                            </Grid>
                            <Pagination page={page} pageCount={Math.ceil(searchDriver.length / pageSize)} href="/drivers"/>
                        </>
                        ) : 'Nothing to show...'}
                    </main>
                ) : (
                    <main className="p-4 md:p-10 mx-auto max-w-7xl">
                        {drivers && drivers.length > 0 ? (
                        <>
                            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                                {drivers.slice((page - 1) * pageSize, page * pageSize).map((driver, index) => (
                                    <DriverCards key={driver.id} driver={driver} index={index} isAdmin={isAdmin} />
                                ))}
                            </Grid>
                            <Pagination page={page} pageCount={Math.ceil(drivers.length / pageSize)} href="/drivers"/>
                        </>
                        ) : 'Nothing to show...'}
                    </main>
                )
            )}
        </>
    );
}