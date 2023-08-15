"use client";

import sgidLogo from "@/assets/logo.png";
import singpassLogo from "@/assets/singpass.svg";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const [loginType, setLoginType] = useState('singpass')
  const router = useRouter()

  const handleLogin = () => {
    switch (loginType) {
      case 'singpass':
        router.push('/login')
        break;
      case 'admin':
        router.push('/admin')
        break;
      case 'trainer':
        router.push('/trainer')
        break;
      default:
        break;
    }
  }

  return (
    <div className="bg-white rounded-md py-12 px-8 flex flex-col max-w-lg">
      <div className="flex gap-12 w-4/5 mx-auto mb-8">
        <div className="w-full grid place-items-center">
          <Image src={sgidLogo} alt="sgID logo" />
        </div>
        <div className="w-full grid place-items-center">
          <Image src={singpassLogo} alt="Singpass logo" />
        </div>
      </div>
      <select onChange={(e) => setLoginType(e.target.value)} className="mb-4 w-full text-center border-2 border-black rounded-md">
        <option value="singpass">Login with Singpass app</option>
        <option value="admin">Login as Admin</option>
        <option value="trainer">Login as Trainer</option>
      </select>

      <button onClick={handleLogin} className="py-2 px-4 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-fit mx-auto mt-8">
        Login
      </button>

    </div>
  );
};

export default Login;
