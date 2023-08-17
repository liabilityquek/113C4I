'use client'

import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { LogoutButton } from '@/components/button.component'

export default async function Dashboard() {
  const session = await getSession();
  console.log(`session in admin: ${JSON.stringify(session, null, 2)}`)
  const userName = session?.user?.name;
  const userEmail = session?.user?.email

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <h1>Rendering Admin Dashboard</h1>
      <div className="mt-8">
        {userName ? <p className="mb-3">Welcome: {userName}</p> : null}
        {userEmail ? <p className="mb-3">Email: {userEmail}</p> : null}

      </div>
      <div className="w-full grid grid-cols-2 py-2 gap-4">
        <LogoutButton />

      </div>
    </>
  )
}