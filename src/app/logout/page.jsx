import { redirect } from "next/navigation";
import { getCookies } from "@/lib/get-cookies";
import { deleteSession } from "@/lib/store";

const handleLogout = async () => {
    // Get session ID from cookie
    const sessionId =  getCookies();
  
    if (!sessionId) {
      console.error("Session ID not found in browser's cookies");
    }else{
      // Delete session from memory
    
      await deleteSession(sessionId)
    
      // Redirect to homepage
      redirect("/");
    }
}

export default async function Logout() {
  await handleLogout();
  return <></>;
}
