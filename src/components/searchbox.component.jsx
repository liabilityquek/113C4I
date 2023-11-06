'use client'

import { Combobox } from "@headlessui/react"
import { debounce } from 'lodash'
import { useState, useEffect, useRef } from "react"


export default function SearchBox({ onSearch }) {
    const debounceOnChange = useRef(
        debounce((value) => {
            onSearch(value)
        }, 500)
    ).current

    const handleChange = (e) => {
        debounceOnChange(e.target.value)
    }

    useEffect(() => {
        return () => {
            debounceOnChange.cancel()
        }
    }, [debounceOnChange])

    return (
        <div className="relative w-48">
            <Combobox>
                <Combobox.Input
                    className="border px-2 py-1 rounded w-full bg-blue-100"
                    placeholder='Search'
                    onChange={handleChange} />
            </Combobox>
        </div>
    )
}