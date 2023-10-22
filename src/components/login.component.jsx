"use client";

import armyLogo from "@/assets/singapore-army-saf.png";
import singpassLogo from "@/assets/singpass.svg";
import Image from "next/image";

import { LoginButton } from "@/components/button.component"

const Login = () => {
  return (
    <div className="bg-white rounded-md py-12 px-8 flex flex-col max-w-lg">
      <div className="flex gap-12 w-4/5 mx-auto mb-8">
        <div className="w-full grid place-items-center">
          <Image src={armyLogo} alt="sgID logo" />
        </div>
        <div className="w-full grid place-items-center">
          <Image src={singpassLogo} alt="Singpass logo" />
        </div>
      </div>
    <LoginButton />
    </div>
  );
};

export default Login;
