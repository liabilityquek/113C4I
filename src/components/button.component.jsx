"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { DeleteModal, AmendModal } from "./modal.component";

const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL;

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Sign out</button>;
};

export const LoginButton = () => {
  const loginType = [
    {
      value: "singpass",
      label: "Login with Singpass app",
      link: `${NEXTAUTH_URL}/singpass`,
    },
    {
      value: "trainer",
      label: "Login as Trainer",
      link: `${NEXTAUTH_URL}/trainer`,
    },
    { value: "admin", label: "Login as Admin", link: `${NEXTAUTH_URL}/admin` },
  ];

  return (
    <>
      {loginType.map((type) => {
        return (
          <button className="py-2 px-1 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full mx-auto mt-4 justify-center items-center">
            <Link
              prefetch={true}
              href={type.link}
              className="flex justify-center items-center"
            >
              {type.label}
            </Link>
          </button>
        );
      })}
    </>
  );
};

export const DeleteButton = ({ driver, driverId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteDriver = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${NEXT_PUBLIC_BASEURL}/api/server/delete-driver/${driverId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Error deleting driver");
      console.log("Driver deleted successfully");
    } catch (e) {
      console.error(`Error deleting driver id: ${driverId} - ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        {loading ? "Loading..." : 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
        onClick={openModal}
      >
        <path
          fillRule="evenodd"
          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
          clipRule="evenodd"
        />
      </svg>
}

      <DeleteModal
        driver={driver}
        isOpen={isOpen}
        open={openModal}
        close={closeModal}
        onDelete={deleteDriver}
      />

      
    </>
  );
};

export const AmendButton = ({ driver, driverId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null)

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${NEXT_PUBLIC_BASEURL}/api/server/amend-driver/${userId}/${driverId}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        });
        if (response.status === 400) {
          const errorText = await response.text();
          setLoading(false);
          setServerError(errorText);
          return;
      }else{
        const errorData = await response.json();
        setServerError(errorData)
      }
    } catch (e) {
      console.error(`Error amending driver id: ${driverId} - ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? "Loading..." : 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
        onClick={openModal}
      >
        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
      </svg>
}

      <AmendModal
      driver={driver}
      isOpen={isOpen}
      open={openModal}
      close={closeModal}
      onSubmit={onSubmit}
      serverError={serverError}
    />

    </>
  );
};
