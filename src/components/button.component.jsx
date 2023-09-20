'use client'

import Link from "next/link";
import { useState } from 'react';
import { signOut } from "next-auth/react";
import { Dialog, Transition } from '@headlessui/react'

const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL
const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL

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

export const DeleteButton = ({ driver }) => {

  const [isOpen, setIsOpen] = useState(false)
  const handleOpenDialog = () => {
    setIsOpen(true)
  }

  return(
<>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" onClick={handleOpenDialog}>
  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
</svg>

<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <p>
            Are you sure you want to delete this {driver} profile? All the data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Delete</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
      
    </>
  )
}

export const AmendButton = () => {
  
}