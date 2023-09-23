import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from '@/components/navbar.component';
import checkAdmin from '@/lib/checkAdmin';
import { getAllDrivers } from '@/lib/drivers'
import Link from "next/link";
import { Card, Flex, Grid } from '@tremor/react';
import { DeleteButton, AmendButton } from '@/components/button.component'

export const metadata = {
    title: "Drivers"
}

export const revalidate = 30; //page will revalidate within 30s

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }
    const userName = session?.user?.name;
    const userId = session?.user?.id
    const isAdmin = await checkAdmin(userName)
    const { drivers } = await getAllDrivers()

    return (
        <>
            <Header />
            <>
                <main className="p-4 md:p-10 mx-auto max-w-7xl">
                    {drivers && drivers.length > 0 ? (
                        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                            {drivers.map((driver, index) => (
                                <Card className='hover:shadow-xl cursor-pointer border-green-500 '>

                                    <Link href={`/drivers/${driver.name}`} prefetch={false}>
                                        <>
                                            <Flex
                                                justifyContent="start"
                                                alignItems="baseline"
                                                className="space-x-2"
                                            >
                                                {driver.title ? <Image
                                                    src={driver.avatar}
                                                    alt={driver.name}
                                                    priority={index === 0} //load the image asap
                                                    width={640}
                                                    height={360}
                                                    className="rounded-t"
                                                /> : null
                                                }
                                                <div className="font-semibold py-1 text-left">
                                                    <h2>{driver?.rank} {driver?.name}</h2>
                                                    <h2>Contact: {driver?.contact}</h2>
                                                    <h2>Next Of Kin: {driver?.next_of_kin_name}</h2>
                                                    <h2>Relationship: {driver?.relationship}</h2>
                                                    <h2>Next Of Kin Contact: {driver?.next_of_kin_contact}</h2>
                                                    <h2>Availability: {driver?.availability}</h2>
                                                </div>
                                            </Flex>
                                        </>
                                    </Link>

                                    {isAdmin ? (
                                        <div className='cursor-pointer mt-4 flex justify-between'>
                                            <DeleteButton driver={driver?.name} driverId={driver.id} />
                                            <AmendButton driver={driver} driverId={driver.id} userId={userId}/>
                                        </div>
                                    ) : (
                                        null
                                    )}
                                </Card>
                            ))}
                        </Grid>
                    )

                        : 'Nothing to show...'
                    }

                </main>
            </>
        </>
    );
}