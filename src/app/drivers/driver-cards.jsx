'use client'

import Link from "next/link";
import { Card, Flex, Grid } from '@tremor/react';
import { DeleteButton, AmendButton } from '@/components/button.component'
import { useState, useEffect } from "react"
import SearchBox from '@/components/searchbox.component';
// import Image from 'next/image'

const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export default function DriverCards({ driver, index, isAdmin, userId }) {
    return (
                            <Card className='hover:shadow-xl cursor-pointer border-green-500 '>

                                    <Link href={`/drivers/${driver.name}`} prefetch={false}>
                                        <>
                                            <Flex
                                                justifyContent="start"
                                                alignItems="baseline"
                                                className="space-x-2"
                                                key={index}
                                            >
                                                <div className="font-semibold py-1 text-left">
                                                    <h2>{driver?.rank.toUpperCase()} {driver?.name.toUpperCase()}</h2>
                                                    <h2>Contact: {driver?.contact}</h2>
                                                    <h2>Next Of Kin: {driver?.next_of_kin_name.toUpperCase()}</h2>
                                                    <h2>Relationship: {driver?.relationship.toUpperCase()}</h2>
                                                    <h2>Next Of Kin Contact: {driver?.next_of_kin_contact}</h2>
                                                    <h2>Availability: {driver?.availability}</h2>
                                                    {driver.vehicles.length > 0 ? 
                                                    (
                                                        <h2>Vehicle/s: {driver?.vehicles}</h2>
                                                    ) : null}
                                                </div>
                                            </Flex>
                                        </>
                                    </Link>

                                {isAdmin ? (
                                    <div className='cursor-pointer mt-4 flex justify-between'>
                                        <DeleteButton driver={driver?.name} driverId={driver.id} />
                                        <AmendButton driver={driver} driverId={driver.id} userId={userId} />
                                    </div>
                                ) : (
                                    null
                                )}
                            </Card>

    );
}