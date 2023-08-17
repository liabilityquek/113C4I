'use client'

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
    return (
      <button className="py-2 px-4 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-fit mx-auto mt-8F" onClick={() => signOut()}>
        Sign Out
      </button>
    );
  };