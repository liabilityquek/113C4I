'use client'

import { Combobox } from "@headlessui/react"
import { useState, useEffect } from "react"


export default function SearchBox({ onSearch }) {

    const handleChange = (e) => {
        onSearch(e.target.value)
    }

    return (
        <div className="relative w-48">
            <Combobox>
                <Combobox.Input
                    className="border px-2 py-1 rounded w-full bg-blue-100"
                    placeholder='Search driver...'
                    onChange={handleChange} />
            </Combobox>
        </div>
    )
}