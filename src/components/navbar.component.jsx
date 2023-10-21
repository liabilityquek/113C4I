"use client";

import { useSession } from "next-auth/react";
import { LogoutButton } from './button.component'
import { useEffect, useState } from "react";
import checkAdmin from '@/lib/checkAdmin';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import saf from '../assets/singapore-army-saf.png'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = user?.name
    const [res, setRes] = useState(null)
    const pathname = usePathname();
    const [isDropDown, setIsDropDown] = useState(false)

    useEffect(() => {
        async function isAdmin() {
            try {
                const result = await checkAdmin(userName)
                setRes(result)
            } catch (e) {
                console.error(`Error fetching res: ${e}`)

            }
        }
        isAdmin()
    }, [userName])

    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Drivers', href: '/drivers' },
        { name: 'Vehicles', href: '/vehicles' }
    ];

    const createNew = [
        { name: 'Driver Profile', href: '/new-driver' },
        { name: 'Vehicle Profile', href: '/new-vehicle' },
    ];

    console.log(`navbar: ${user?.name}`)

    return (
        <Disclosure as="nav" className="bg-white shadow-sm">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <Image
                                        className="h-15 w-12 rounded-full"
                                        src={saf}
                                        height={50}
                                        width={50}
                                        alt={`avatar`}
                                    />

                                </div>
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                pathname === item.href
                                                    ? 'border-slate-500 text-gray-900'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                            )}
                                            aria-current={pathname === item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                    {res ? (
                                        <>
                                        <a
                                            href="/book-out-request"
                                            className={classNames(
                                                pathname === '/book-out-request'
                                                    ? 'border-slate-500 text-gray-900'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                            )}
                                            aria-current={pathname === '/book-out-request' ? 'page' : undefined}
                                        >
                                            Book Out Request
                                        </a>

                                        <button
                                        onClick={() => setIsDropDown(!isDropDown)}
                                        className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                                            Create New
                                            <svg className="w-2.5 h-2.5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="none">
                                                <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                            </svg>
                                            </button>
                                            {isDropDown && (
                                                <div className="bg-gray-200 rounded-lg ">
                                            <ul>
                                                {createNew.map((item) => (
                                                <li>
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            pathname === item.href
                                                                ? 'border-slate-500 text-gray-900'
                                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                            'inline-flex items-center px-3 pt-2 border-b-2 text-sm font-medium'
                                                        )}
                                                        aria-current={pathname === item.href ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                            </li>
                                                ))}

                                            </ul>
                                                </div>

                                            )}
                                            </>

                                    ) : null}

                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex items-center justify-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                            <span className="sr-only">Open user menu</span>
                                            {user?.image ? (
                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    src={user.image}
                                                    height={32}
                                                    width={32}
                                                    alt={`${user?.name || 'placeholder'} avatar`}
                                                />

                                            ) : (
                                                <svg
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    className="text-gray-100"
                                                    xmlns="http://www.w3.org/2000/svg"

                                                >
                                                    <rect
                                                        width="100%"
                                                        height="100%"
                                                        rx="16"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112"
                                                        fill="grey"
                                                    />
                                                </svg>
                                            )}


                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'flex w-full px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        <LogoutButton />
                                                    </div>
                                                )}
                                            </Menu.Item>

                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        pathname === item.href
                                            ? 'bg-slate-50 border-slate-500 text-slate-700'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                    )}
                                    aria-current={pathname === item.href ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                            {res ? (
                                <>
                                <Disclosure.Button
                                    as="a"
                                    href="/book-out-request"
                                    className={classNames(
                                        pathname === '/book-out-request'
                                            ? 'bg-slate-50 border-slate-500 text-slate-700'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                    )}
                                    aria-current={pathname === '/book-out-request' ? 'page' : undefined}
                                >
                                    Book Out Request
                                </Disclosure.Button>

                                <button
                                        onClick={() => setIsDropDown(!isDropDown)}
                                        className='text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                                            <div className='flex items-center'>
                                            Create New
                                            <svg className="w-2.5 h-2.5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="none">
                                                <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                            </svg>
                                            </div>
                                </button>
                                            {isDropDown && (
                                                <div className="bg-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                                            <ul>
                                                {createNew.map((item) => (
                                                <li>
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className={classNames(
                                                            pathname === item.href
                                                                ? 'bg-slate-50 border-slate-500 text-slate-700'
                                                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                                            'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                                        )}
                                                        aria-current={pathname === item.href ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                            </li>
                                                ))}

                                            </ul>
                                                </div>

                                            )}
                                </>
                            ) : null}

                        </div>
                        <div className="border-t border-gray-200 pt-4 pb-3">
                            <>
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        {user?.image ? (
                                            <Image
                                                className="h-8 w-8 rounded-full"
                                                src={user.image}
                                                height={32}
                                                width={32}
                                                alt={`${user?.name || 'placeholder'} avatar`}
                                            />

                                        ) : (
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                className="text-gray-100"
                                                xmlns="http://www.w3.org/2000/svg"

                                            >
                                                <rect
                                                    width="100%"
                                                    height="100%"
                                                    rx="16"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112"
                                                    fill="grey"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">
                                            {user?.name}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <div
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        <LogoutButton />
                                    </div>
                                </div>
                            </>

                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

