"use client";

import { useSession } from "next-auth/react";
import LogoutButton from './button.component'
import { useEffect, useState } from "react";
import Link from "next/link";
import checkAdmin from '@/lib/checkAdmin';

const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export default function Header() {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = user?.name
    const [res, setRes] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        async function isAdmin() {
            const result = await checkAdmin(userName)
            setRes(result)
        }
        isAdmin()
    }, [])

    console.log(`navbar: ${user?.name}`)

    return (
        <nav className="bg-white border-b-4 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div className={`w-full mt-4 md:mt-0 ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
                    <ul className="font-medium flex flex-col p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-300 md:flex-row md:space-x-8 md:border-0 md:bg-white md:ml-auto">
                        <li className="mb-3">
                            <Link href="/dashboard" className="font-bold text-black hover:underline">
                                Dashboard
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link href="/vehicle" className="font-bold text-black hover:underline">Vehicles</Link>
                        </li>
                        <li className="mb-3">
                            <Link href="/driver" className="font-bold text-black hover:underline">
                                Drivers
                            </Link>
                        </li>
                        {res ? (
                            <>
                                <li className="mb-3">
                                    <Link href="/calendar" className="font-bold text-black hover:underline">
                                        Calendar
                                    </Link>
                                </li>

                            </>
                        ) : null}

                        <li className="mb-3">
                            <div className="font-bold text-black">
                                <LogoutButton />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
};

