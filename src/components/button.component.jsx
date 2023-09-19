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

  const [state, setState] = useState('singpass')
  const selectedLoginType = loginType.find((type) => type.value === state);


  return(
    <>
    <select onChange={(e) => setState(e.target.value)} className="mb-4 w-full text-center border-2 border-black rounded-md text-base">
        {loginType.map((type) => (
          <option key={type.value} value={type.value} className="">{type.label}</option>
        ))}
      </select>

      {/* <Link prefetch={false} href={`${selectedLoginType.link}?state=${state}`} className="flex"> */}
      <Link prefetch={true} href={selectedLoginType ? `${selectedLoginType.link}` : '#'} className="flex">
        <button className="py-2 px-4 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-fit mx-auto mt-8">
          Login
        </button>
      </Link>
    </>
  )
}