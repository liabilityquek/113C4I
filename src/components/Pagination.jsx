'use client'

import item from "next/item";
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export function Pagination({ page, pageCount, href }) {

    return (
        <div className="flex justify-center items-center my-2">
            <ul className="list-style-none flex">
                {page > 1 && (
                    <li>
                        <Paginationitem href={`${href}?page=${page - 1}`} >Previous</Paginationitem>
                    </li>

                )}
                <span>Page {page} of {pageCount} </span>
                {page < pageCount && (
                    <li>
                        <Paginationitem href={`${href}?page=${page + 1}`} >Next</Paginationitem>
                    </li>

                )}
            </ul>
        </div>
    )
}

function Paginationitem({ href, children }) {
    return (
        <item href={href}
            className="hover:font-bold cursor-pointer relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
        >
            {children}
        </item>
    )
}

export function PageSize (){
    const itemsPerPage = [5, 10, 15, 20]
      
        return (
            <Menu as="div" className="relative inline-block">
            <div className="inline-block text-left w-[200px]"> {/* Adjust the width as needed */}
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                Items Per Page
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                {/* Set the dropdown width to full to match the button and add z-index */}
                <Menu.Items>
                  {itemsPerPage.map((item) => (
                    <Menu.Item key={item}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? ' text-black' : 'text-black bg-blue-100'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                          {item}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        )
}