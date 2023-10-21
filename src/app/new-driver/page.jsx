import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/navbar.component";


export const metadata = {
  title: "New Driver Profile",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(`session in dashboard: ${JSON.stringify(session, null, 2)}`);
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <h1>Create new driver</h1>
    </>
  );
}