'use client'

import Header from '@/components/navbar.component';
import checkAdmin from '@/lib/checkAdmin';
import { Card, Flex, Grid } from '@tremor/react';
import { DeleteButton, AmendButton } from '@/components/button.component'
import { useParams } from 'next/navigation'
import { getDriver } from '@/lib/drivers';

  
  export default async function Driver() {
    const params = useParams();
    const driver = await getDriver({ params });
  
    return (
      <>
        <Header />
        <>
          <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <h1>{driver.name}</h1>
            <h1>{driver.contact}</h1>
          </main>
        </>
      </>
    )
  }