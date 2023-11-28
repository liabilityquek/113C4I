import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/navbar.component";
import checkAdmin from '@/lib/checkAdmin';
import DashboardComponents from "@/components/dashboard.component";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  // console.log(`session in dashboard: ${JSON.stringify(session, null, 2)}`);
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
      <DashboardComponents />
    </>
  );
}
