import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "113C4I",
    template: "%s | 113C4I",
  },
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
