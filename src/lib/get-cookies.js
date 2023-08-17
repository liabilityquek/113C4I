import { cookies } from "next/headers";

export async function getCookies(){
    const sessionId = cookies().get("sessionId")?.value || "";
    return sessionId
}