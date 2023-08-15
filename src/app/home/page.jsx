import Link from "next/link"

export default async function Home () {
    return (
        <>
        <h1>Rendering Home page</h1>

        <div className="w-full grid grid-cols-2 py-2 gap-4">
        <Link
            prefetch={false}
            href="/logout"
            className="w-full text-white cursor-pointer rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 text-center"
          >
            Logout
          </Link>
       
        </div>
        </>
    )
}