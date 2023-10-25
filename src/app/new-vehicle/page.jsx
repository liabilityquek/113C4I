import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/navbar.component";
import NewVehicle from "./form";

export const metadata = {
  title: "New Vehicle Profile",
};

export default async function CreateVehicle() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <div className="h-screen grid place-items-center px-4">
            <NewVehicle />
        </div>
    </>
  );
}
