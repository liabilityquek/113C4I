import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from '@/components/navbar.component';
import checkAdmin from '@/lib/checkAdmin';
import DashboardComponents from '@/components/dashboard.component';

export const metadata = {
  title: "Dashboard"
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(`session in dashboard: ${JSON.stringify(session, null, 2)}`)
  if (!session) {
    redirect("/");
  } 

  const userName = session?.user?.name;
  // const userEmail = session?.user?.email;
  const isAdmin = await checkAdmin(userName)

  const maskData = (password) => {
    const maskedPortion = password.slice(0, 3)
    const visiblePortion = password.slice(-3)
    return maskedPortion.replace(/./g, '*') + visiblePortion
  }

  return (
    <>
    <Header />
    <DashboardComponents />
      {isAdmin ? (
        <>
          <h1>Rendering Manual login</h1>
        </>
      ) : (
        <>
          <h1>Rendering Social login</h1>
          <div className="mt-8">
            {userName ? <>
              <p className="mb-3">Welcome: {userName}</p>
              <p className="mb-3">Password: {maskData('S1234567X')}</p>
            </>
            : null}
          </div>
        </>
      )}
    </>
  );
}