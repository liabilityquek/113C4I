import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from '@/components/button.component'

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(`session in trainer: ${JSON.stringify(session, null, 2)}`)
  if (!session) {
    redirect("/");
  } 
  const user = session?.user;

  return (
    <>
      <h1>Rendering Trainer Dashboard</h1>
      <div className="mt-8">
        {user ? <p className="mb-3">Welcome: {user?.name}</p> : null}
        {user ? <p className="mb-3">Email: {user?.email}</p> : null}

      </div>
      <div className="w-full grid grid-cols-2 py-2 gap-4">
        <LogoutButton /> 
      </div>
    </>
  )
}