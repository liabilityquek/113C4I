import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from '@/components/navbar.component';
import checkAdmin from '@/lib/checkAdmin';
import ShowDrivers from './show-driver'
// import Image from 'next/image'

export const metadata = {
    title: "Drivers"
}

export default async function Drivers() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }
    const userName = session?.user?.name;
    const userId = session?.user?.id
    const isAdmin = await checkAdmin(userName)

    return (
        <>
        <Header />
        <ShowDrivers isAdmin={isAdmin} userId={userId}/>
        
        </>
    );
}