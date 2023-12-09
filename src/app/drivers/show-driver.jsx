'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import { Card, Flex, Grid } from '@tremor/react';
import SearchBox from '@/components/searchbox.component';
import DriverCards from './driver-cards'
import { PageSize, Pagination } from '@/components/Pagination'
import { useSearchParams } from 'next/navigation'
import { getAllDrivers, getAllFilteredDriver } from '@/lib/drivers'
import { useRouter } from 'next/navigation'


export default function ShowDrivers({ isAdmin, userId }) {
    const [searchQuery, setSearchQuery] = useState(null);
    const [drivers, setDrivers] = useState([])
    const [searchDriver, setSearchDriver] = useState([])
    const [fullDriversLength, setFullDriversLength] = useState(null)
    const [filteredDriverLength, setFilteredDriverLength] = useState(null)
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5)
    const searchParams = useSearchParams()
    const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1)
    const router = useRouter()
    
    useEffect(() => {
        if(!searchQuery){
            const fetchDrivers = async () => {
                setLoading(true)
                try{
                    const { drivers, driversCount } = await getAllDrivers(pageSize, page)
                    setDrivers(drivers)
                    setFullDriversLength(driversCount)
                }catch(err){
                    console.error(`Error loading this page: ${err}`)
                }finally{
                    setLoading(false)
                }
            }
            fetchDrivers()
        }else{
            const fetchFilteredDrivers = async () => {
                setLoading(true)
                try{
                    const { drivers, filteredDriverCount } = await getAllFilteredDriver(pageSize, page, searchQuery)
                    setSearchDriver(drivers);
                    setFilteredDriverLength(filteredDriverCount)
                    console.log(`searchQuery: ${searchQuery}`)    
                }catch(err){
                    console.error(`Error loading this page: ${err}`)
                }finally{
                    setLoading(false)
                }
            }
            fetchFilteredDrivers()
        }
    },[page, pageSize, searchQuery])

    const handlePageSizeChange  = (newPageSize) => {
        setPageSize(newPageSize)
        setPage(1)
        console.log(`newPageSize: ${newPageSize}`)
        router.push(`/drivers?page=1`);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        router.push(`/drivers?page=${newPage}`);
    };
    
    return (
        <>
            <div className="flex justify-center items-center mt-5">
                <SearchBox onSearch={setSearchQuery}/>
            </div>
            
            <div className="flex justify-center items-center mt-5">
                <PageSize pageSize={pageSize} setPageSize={handlePageSizeChange}/>
            </div>

            {loading ? (
                <div className="flex justify-center items-center mt-5">Loading...</div>
            ) : searchQuery ? (
                searchDriver && searchDriver.length > 0 ? (
                    <main className="p-4 md:p-10 mx-auto max-w-7xl">
                        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                            {searchDriver.map((driver, index) => (
                                <DriverCards key={driver.id} driver={driver} index={index} isAdmin={isAdmin} />
                            ))}
                        </Grid>
                        <Pagination page={page} pageCount={Math.ceil(filteredDriverLength / pageSize)} handlePageChange={handlePageChange} />
                    </main>
                ) : 'Nothing to show...'
            ) : drivers && drivers.length > 0 ? (
                <main className="p-4 md:p-10 mx-auto max-w-7xl">
                    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                        {drivers.map((driver, index) => (
                            <DriverCards key={driver.id} driver={driver} index={index} isAdmin={isAdmin} />
                        ))}
                    </Grid>
                    <Pagination page={page} pageCount={Math.ceil(fullDriversLength / pageSize)} handlePageChange={handlePageChange} />
                </main>
            ) : 'Nothing to show...'}
        </>
    );
}