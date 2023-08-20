const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export default async function checkAdmin (userName) {
    const response = await fetch(`${NEXT_PUBLIC_NEXTAUTH_URL}/api/auth-admin`)
    const data = await response.json()
    const checkAdmin = data.some(admin => admin.name === userName)
    return checkAdmin
}