import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from '@/components/navbar.component';

export const metadata = {
  title: "Dashboard"
}

const NEXTAUTH_URL = process.env.NEXTAUTH_URL

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(`session in dashboard: ${JSON.stringify(session, null, 2)}`)
  if (!session) {
    redirect("/");
  } 

  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const response = await fetch(`${NEXTAUTH_URL}/api/auth-admin`)
  const data = await response.json()
  console.log(`data: ${JSON.stringify(data, null, 2)}`)

  const maskData = (password) => {
    const maskedPortion = password.slice(0, 3)
    const visiblePortion = password.slice(-3)
    return maskedPortion.replace(/./g, '*') + visiblePortion
  }

  return (
    <>
    <Header />
      {data && data[0] && data[0].email === userEmail ? (
        <>
          <h1>Rendering Manual login</h1>
          <div className="mt-8">
            {userName ? <p className="mb-3">Welcome: {userName}</p> : null}
          </div>
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