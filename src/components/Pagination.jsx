'use client'

import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export function Pagination({ page, pageCount, handlePageChange }) {

  console.log(`pageCount: ${pageCount}`)
  
    return (
        <div className="flex justify-center items-center my-2">
            <ul className="list-style-none flex">
                {page > 1 && (
                    <li>
                        <Paginationitem onClick={() => handlePageChange(page - 1)} >Previous</Paginationitem>
                    </li>

                )}
                <span>Page {page} of {pageCount} </span>
                {page < pageCount && (
                    <li>
                        <Paginationitem onClick={() => handlePageChange(page + 1)} >Next</Paginationitem>
                    </li>

                )}
            </ul>
        </div>
    )
}

function Paginationitem({ onClick, children }) {
    return (
      <div
      onClick={onClick}
      className="hover:font-bold cursor-pointer relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
    >
            {children}

      </div>
    )
}

export function PageSize ({ pageSize, setPageSize }){
    const itemsPerPage = [5, 10, 15, 20]
    

    const handleSetPageSize = (count) => {
      setPageSize(count)
      console.log(`page size in Pagination: ${pageSize}`)
    }
      
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
                  enter="transition ease-out duration-500" // Adjust duration for smoother transition
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-300" // Adjust duration for smoother transition
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
              >
                  <Menu.Items>
                      {itemsPerPage.map((item) => (
                          <Menu.Item key={item}>
                              <button
                                  onClick={() => handleSetPageSize(item)}
                                  className={`group flex justify-center w-full items-center px-2 py-2 text-sm ${
                                      item === pageSize ? 'bg-blue-500 text-white' : 'text-black bg-blue-100'
                                  } hover:bg-white`}
                              >
                                  {item}
                              </button>
                          </Menu.Item>
                      ))}
                  </Menu.Items>
              </Transition>
          </div>
      </Menu>
  );
}