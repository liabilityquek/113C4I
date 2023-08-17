import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "113C4I",
  description: "113C4I CMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
