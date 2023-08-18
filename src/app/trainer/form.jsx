"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import armyLogo from "@/assets/singapore-army-saf.png";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export const TrainerLoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit = async (e) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } 
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="bg-white rounded-md py-8 px-8 flex flex-col max-w-lg">
    <div className="flex gap-12 w-4/5 mx-auto mb-8">
        <div className="w-full grid place-items-center">
            <Image src={armyLogo} alt="sgID logo" />
        </div>
    </div>
    <form onSubmit={onSubmit}>
      <a
        className="px-7 py-2 border border-gray-200 bg-white text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        onClick={() => signIn("google", { callbackUrl })}
        role="button"
      >
        <img
          className="self-center pr-2"
          src="/google.svg"
          alt=""
          style={{ height: "2rem" }}
        />
        Continue with Google
      </a>
      <a
        className="px-7 py-2  bg-blue-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
        onClick={() => signIn("facebook", { callbackUrl })}
        role="button"
      >
        <img
          className="self-center pr-2"
          src="/facebook.png"
          alt=""
          style={{ height: "2.1rem" }}
        />
        Continue with Facebook
      </a>
    </form>
    </div>
  );
};
