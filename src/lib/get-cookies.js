import { cookies } from "next/headers";

export function getCookies(){
    const sessionId = cookies().get("sessionId")?.value || "";
    return sessionId
}