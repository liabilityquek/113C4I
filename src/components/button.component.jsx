'use client'

import { signOut } from "next-auth/react";

export default function LogoutButton () {
    return (
      <button className="hover:underline" onClick={() => signOut()}>
        Logout
      </button>
    );
  };