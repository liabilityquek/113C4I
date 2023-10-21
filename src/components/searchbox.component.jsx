'use client'

import { Combobox } from "@headlessui/react"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';

export default function SearchBox() {
    const router = useRouter();
    const [query, setQuery] = useState('')
    const [drivers, setDrivers] = useState([])
    const [error, setError] = useState(null)
    const [selectedDriver, setSelectedDriver] = useState('')
    console.log(`query: ${query}`)
    console.log(`selected: ${JSON.stringify(selectedDriver, null, 2)}`)
    const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

    
    useEffect(() => {
        (async () => {
            try{
                const response = await fetch(`${NEXT_PUBLIC_NEXTAUTH_URL}/api/search-driver?query=`
                + encodeURIComponent(query));
                const data = await response.json();
                console.log(`SearchBox: ${JSON.stringify(data, null, 2)}`)
                setDrivers(data.drivers);
            }catch(err){
                console.error(`Error loading this page: ${err}`)
                setError(error);
            }
        })();

        if(error){
            router.push('/not-found')
        }

    }, [query])

    const handleChange = (selectedDriver) => {
        setSelectedDriver(selectedDriver)
        router.push(`/drivers/${selectedDriver.name}`)
    }


    return (
        <div className="relative w-48">
            <Combobox onChange={handleChange}>
                <Combobox.Input
                    className="border px-2 py-1 rounded w-full bg-blue-100"
                    placeholder='Search driver...'
                    onChange={(event) => setQuery(event.target.value)} />

                <Combobox.Options className="absolute bg-gray-50 py-1 w-full z-10">
                    {drivers.length > 0 && drivers.map((driver) => (
                        <Combobox.Option key={driver.name} value={driver}>
                            {({ active }) => {
                                console.log('Is active:', active);
                                return (
                                    <div className={`block px-2 truncate w-full ${active ? 'bg-blue-100 cursor-pointer' : ''}`}>
                                        {driver.name}
                                    </div>
                                );
                            }}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </div>
    )
}