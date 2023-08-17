import Login from "@/components/Login";
import { User } from '@/components/user.component'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="h-screen grid place-items-center px-4">
      <Login />
      
      <User />
    </main>
  );
}
