import { useEffect, useState } from 'react'
export function useIsClient () {
    //adding a useEffect to resolve the error: Text Content does not match server-rendered HTML
    //https://nextjs.org/docs/messages/react-hydration-error
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
      }, [])
      return isClient
}