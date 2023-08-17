import Link from "next/link"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCookies } from "@/lib/get-cookies";

export default async function Dashboard(sessionId) {
  const session = await getServerSession(authOptions);
  const getSessionId = await getCookies(sessionId);
  if (!session || !getSessionId) {
    redirect("/");
  }

  const userInfo = await getSessionId(sessionId)

  const user = session?.user;

  return (
    <>
      <h1>Rendering Dashboard page</h1>
      <div className="mt-8">
        {<p className="mb-3">Welcome: {user?.name}</p>}
        {<p className="mb-3">Email: {user?.email}</p>}

        {/* {Object.entries(userInfo).map(([field, value]) => (
          <div className="w-full grid grid-cols-2 py-2 gap-4" key={field}>
            <div className="w-full whitespace-nowrap">{field}</div>
            <div className="w-full">{value}</div>
          </div>
        ))} */}

      </div>
      <div className="w-full grid grid-cols-2 py-2 gap-4">
        <Link
          prefetch={false}
          href="/logout"
          className="w-full text-white cursor-pointer rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 text-center"
        >
          Logout
        </Link>

      </div>
    </>
  )
}