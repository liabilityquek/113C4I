"use client";

import armyLogo from "@/assets/singapore-army-saf.png";
import singpassLogo from "@/assets/singpass.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

const loginType = [
  { value: 'singpass', label: 'Login with Singpass app', link: `${NEXTAUTH_URL}/login` },
  { value: 'trainer', label: 'Login as Trainer', link: `${NEXTAUTH_URL}/api/auth/signin` },
  { value: 'admin', label: 'Login as Admin', link: `${NEXTAUTH_URL}/admin` },
]

const Login = () => {
  const [state, setState] = useState('')
  const selectedLoginType = loginType.find((type) => type.value === state);
  return (
    <div className="bg-white rounded-md py-12 px-8 flex flex-col max-w-lg">
      {/* {console.log(`state in Login component: ${state}`)} */}
      <div className="flex gap-12 w-4/5 mx-auto mb-8">
        <div className="w-full grid place-items-center">
          <Image src={armyLogo} alt="sgID logo" />
        </div>
        <div className="w-full grid place-items-center">
          <Image src={singpassLogo} alt="Singpass logo" />
        </div>
      </div>
      <select onChange={(e) => setState(e.target.value)} className="mb-4 w-full text-center border-2 border-black rounded-md text-base">
        {loginType.map((type) => (
          <option key={type.value} value={type.value} className="">{type.label}</option>
        ))}
      </select>

      {/* <Link prefetch={false} href={`${selectedLoginType.link}?state=${state}`} className="flex"> */}
      <Link prefetch={false} href={selectedLoginType ? `${selectedLoginType.link}` : '#'} className="flex">
        <button className="py-2 px-4 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-fit mx-auto mt-8">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Login;
