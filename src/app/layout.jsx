import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from '@/components/navbar.component';
import checkAdmin from '@/lib/checkAdmin';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "113C4I",
    template: "%s | 113C4I",
  },
};

export default async function RootLayout({ children }) {

    const session = await getServerSession(authOptions);
    const userName = session?.user?.name;
    const userImage = session?.user?.image
    const userEmail = session?.user?.email
    const isAdmin = await checkAdmin(userName)

  return (
    <html lang="en">
      <body className={inter.className}>
      <Header isAdmin={isAdmin} userName={userName} userImage={userImage} userEmail={userEmail}/>
      <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
