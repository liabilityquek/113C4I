"use client";

import sgidLogo from "@/assets/logo.png";
import singpassLogo from "@/assets/singpass.svg";
import Image from "next/image";
import Link from "next/link";

const Login = () => {

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
      <Link prefetch={false} href={`/login`} className="flex">
        <button className="py-2 px-4 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-fit mx-auto mt-8">
          Login with Singpass app
        </button>
      </Link>
    </div>
  );
};

export default Login;
