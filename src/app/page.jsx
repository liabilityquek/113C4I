import Login from "@/components/login.component";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(`session: ${JSON.stringify(session, null, 2)}`);
  return (
    <main className="h-screen grid place-items-center px-4">
      <Login />
    </main>
  );
}
