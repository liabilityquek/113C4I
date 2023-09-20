'use client'

import Link from "next/link";
import { useState } from 'react';
import { signOut } from "next-auth/react";
const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export const LogoutButton = () => {
  return (
    <button onClick={() => signOut()}>
      Sign out
    </button>
  );
};

export const LoginButton = () => {
  const loginType = [
    { value: 'singpass', label: 'Login with Singpass app', link: `${NEXTAUTH_URL}/singpass` },
    { value: 'trainer', label: 'Login as Trainer', link: `${NEXTAUTH_URL}/trainer` },
    { value: 'admin', label: 'Login as Admin', link: `${NEXTAUTH_URL}/admin` },
  ]

  return (
    <>
        {loginType.map((type) => {
          return (
            <button className="py-2 px-1 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full mx-auto mt-4 justify-center items-center">
            <Link prefetch={true} href={type.link} className="flex justify-center items-center" >
              {type.label}
            </Link>
      </button>
          )
        })}
    </>
  )
}