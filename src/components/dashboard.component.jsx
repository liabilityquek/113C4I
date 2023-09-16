'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { useState, useEffect } from 'react'

const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export default function DashBoardFigures() {
  const [loading, setLoading] = useState(false);

  const [driver, setDriver] = useState([
    { name: 'Present', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-present-count` },
    { name: 'Deferred', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-deferred-count` },
  ]);

  const [vehicle, setVehicle] = useState([
    { name: '5-TON', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-fiveton-count` },
    { name: 'OUV', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-ouv-count` },
    { name: 'SOUV', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-souv-count` },
    { name: 'CP', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-cp-count` },
    { name: 'FSD', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-fsd-count` },
    { name: 'PSD', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-psd-count` },
    { name: 'GP', value: 0, url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-gp-count` },
  ]);

  const [data, setData] = useState([
    {
      category: 'Drivers',
      stat: '0',
      data: driver,
      url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-driver-count`,
    },
    {
      category: 'Vehicles',
      stat: '0',
      data: vehicle,
      url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-vehicle-count`,
    },

  ])

  useEffect(() => {
    const fetchIndividualData = async (iterableArr, dataFunction) => {
      for (const [index, item] of iterableArr.entries()) {
        try {
          const response = await fetch(item.url)
          // const response = await fetch(`${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-${url}-${item.name.toLowerCase().replace('-', '')}-count`)
          const data = await response.json()
          dataFunction(prev => {
            const newArr = [...prev]
            newArr[index].value = data
            return newArr
          })
        } catch (err) {
          console.log(`Error fetching driver data: ${e}`)
        }
      }
    }
    const fetchData = async () => {
      setLoading(true)
      await fetchIndividualData(driver, setDriver)
      await fetchIndividualData(vehicle, setVehicle)
      const newData = [];
      for (let item of data) {
        try {
          const response = await fetch(item.url)
          const statData = await response.text();
          newData.push({ ...item, stat: statData })
        }
        catch (e) {
          console.error('Error fetching data: ', e)
        }
      }
      setData(newData)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
            {data.map((item) => (
              <Card key={item.category}>
                <Title>{item.category}</Title>
                <Flex
                  justifyContent="start"
                  alignItems="baseline"
                  className="space-x-2"
                >
                  {loading ? 'Loading...' : <Metric>{item.stat}</Metric>}
                  <Text>Total Count</Text>
                </Flex>
                <Flex className="mt-6">
                  <Text>Field</Text>
                  <Text className="text-right">Count</Text>
                </Flex>
                {loading ? 'Loading...' :
                  <BarList
                    data={item.data}
                    valueFormatter={(number) =>
                      Intl.NumberFormat('us').format(number).toString()
                    }
                    className="mt-2"
                  />
                }
              </Card>
            ))}
          </Grid>
        </main>
      
    </>
  );
}