'use client'

import { useState, useEffect } from "react"
import Link from "next/link";

export default function Pagination({ page, pageCount, href }) {

    return (
        <div className="flex justify-center items-center my-2">
            <ul className="list-style-none flex">
                {page > 1 && (
                    <li>
                        <PaginationLink href={`${href}?page=${page - 1}`} >Previous</PaginationLink>
                    </li>

                )}
                <span>Page {page} of {pageCount} </span>
                {page < pageCount && (
                    <li>
                        <PaginationLink href={`${href}?page=${page + 1}`} >Next</PaginationLink>
                    </li>

                )}
            </ul>
        </div>
    )
}

function PaginationLink({ href, children }) {
    return (
        <Link href={href}
            className="hover:font-bold cursor-pointer relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
        >
            {children}
        </Link>
    )
}