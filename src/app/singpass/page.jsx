import { redirect } from "next/navigation";
import { sgidClient } from "@/lib/sgidClient";
// import { store } from "@/lib/store";
import { generatePkcePair } from "@opengovsg/sgid-client";
import { storeSession } from "@/lib/store";
import { getCookies } from "@/lib/get-cookies";

export const metadata = {
  title: "TO"
}

const handleLogin = async (state) => {
  const sessionId =  getCookies();
  console.log(`sessionId from singpass page: ${sessionId}`)

  if (!sessionId) {
    throw new Error("Session ID not found in browser's cookies");
  }

  // Generate PKCE pair
  const { codeChallenge, codeVerifier } = generatePkcePair();

  // Generate authorization url
  const { url, nonce } = sgidClient.authorizationUrl({
    state,
    codeChallenge,
    scope: ['openid', 'myinfo.name']
  });

  // Store state in memory
  // store.set(sessionId, { state, codeVerifier, nonce });
  await storeSession(sessionId, { state, codeVerifier, nonce });
  // console.log(`url: ${url}`)
  // console.log(`state in Login page: ${state}`)
  redirect(url);
};

export default async function Login({ searchParams }) {
  await handleLogin(searchParams?.state || "");
  return <></>;
}
