import Header from '@/components/navbar.component';
import { getDriver, getAllDrivers } from '@/lib/drivers'
// import checkAdmin from '@/lib/checkAdmin';
// import { Card, Flex, Grid } from '@tremor/react';
// import { DeleteButton, AmendButton } from '@/components/button.component'
export const revalidate = 30;

export async function generateMetadata({ params: { name } }) {
  const driver = await getDriver(name);
  return driver ? { title: driver.name } : notFound();
}

export async function generateStaticParams() {
  const { drivers } = await getAllDrivers()
  return drivers.map(driver => ({ name: driver.name }))
}


export default async function Driver({ params: { name } }) {

  const driver = await getDriver(name)

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