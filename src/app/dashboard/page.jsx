import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardComponents from "@/components/dashboard.component";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <DashboardComponents />
    </>
  );
}
