'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { useState, useEffect } from 'react'

const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export default function DashBoardFigures() {
  const [loading, setLoading] = useState(false);

  const [driver, setDriver] = useState([
    { name: 'Present', value: 0 },
    { name: 'Deferred', value: 0 },
  ]);

  const [vehicle, setVehicle] = useState([
    { name: '5-Ton', value: 0 },
    { name: 'OUV', value: 0 },
    { name: 'SOUV', value: 0 },
    { name: 'CP', value: 0 },
    { name: 'FSD', value: 0 },
    { name: 'PSD', value: 0 },
    { name: 'GP', value: 0 },
  ]);
  
  useEffect(() => {
    const fetchIndividualDriverData = async (name, index) => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-driver-count`)
        const data = await response.json()
        console.log(`data: ${data}`)
        setDriver((prev) => {
          const newArr = [...prev];
          newArr[index].value = data;
          return newArr
        })
      } catch (e) {
        console.error(`Error fetching driver data: ${e}`)
      }
    }
    driver.forEach((item, index) => {
      fetchIndividualDriverData(item.name, index)
    })
  }, [])

  useEffect(() => {
    const fetchIndividualVehicleData = async (name, index) => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-vehicle-count`);
        // const response = await fetch(`${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-vehicle-${name.toLowerCase().replace('-', '')}-count`);
        const data = await response.json();
        setVehicle((prev) => {
          const newArr = [...prev];
          newArr[index].value = data;
          return newArr
        })
      } catch (e) {
        console.error(`Error fetching vehicle data: ${e}`)
      }
    }
    vehicle.forEach((item, index) => {
      fetchIndividualVehicleData(item.name, index)
    })
  }, [])

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
      url: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-driver-count`,
    },

  ])
  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      try {
      for (let item of data) {
          const response = await fetch(item.url)
          const statData = await response.text();
          newData.push({ ...item, stat: statData })
        } }
        catch (e) {
          console.error('Error fetching data: ', e)
        }
        setData(newData)
      }
      fetchData()
    },[])


  return (
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
              <Metric>{item.stat}</Metric>
              {console.log(`stat: ${typeof(item.stat)}`)}
              <Text>Total Count</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Field</Text>
              <Text className="text-right">Count</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
    </main>
  );
}