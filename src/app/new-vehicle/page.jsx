import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/navbar.component";
import NewVehicle from "./form";
import checkAdmin from '@/lib/checkAdmin';

export const metadata = {
  title: "New Vehicle Profile",
};

export default async function CreateVehicle() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

    const userName = session?.user?.name;
    const userImage = session?.user?.image
    const userEmail = session?.user?.email
    const userId = session?.user?.id
    const isAdmin = await checkAdmin(userName)

  return (
    <>
      <Header isAdmin={isAdmin} userName={userName} userImage={userImage} userEmail={userEmail}/>
      <div className="h-screen grid place-items-center px-4">
            <NewVehicle />
        </div>
    </>
  );
}
