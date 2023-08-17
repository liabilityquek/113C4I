// import { store } from '@/lib/store'
import { sgidClient } from '@/lib/sgidClient'
import { redirect } from 'next/navigation'
import { storeSession } from '@/lib/store'
import { getSession } from '@/lib/store'
import { getCookies } from "@/lib/get-cookies";

const getAndStoreUserInfo = async (code, sessionId) => {
  // const session = store.get(sessionId)
  const session = await getSession(sessionId);


  if (!session) {
    throw new Error('Session not found')
  }

  const { nonce, codeVerifier } = session

  if (!codeVerifier) {
    throw new Error('Code verifier not found')
  }

  // Exchange auth code for access token
  const { accessToken, sub } = await sgidClient.callback({
    code,
    nonce,
    codeVerifier,
  })

  // Request user info with access token
  const { data } = await sgidClient.userinfo({
    accessToken,
    sub,
  })

  // Store userInfo and sgID in memory
  const updatedSession = {
    ...session,
    userInfo: data,
    sub,
  }
  // store.set(sessionId, updatedSession)
  await storeSession(sessionId, updatedSession);


  return updatedSession
}

export default async function Callback({ searchParams }) {
  console.log(`searchParams: ${JSON.stringify(searchParams, null, 2)}`)
  const code = searchParams?.code
  const sessionId =  getCookies();
  console.log(`sessionId: ${sessionId}`)
  if (!code) {
    throw new Error(
      'Authorization code is not present in the url search params',
    )
  } else if (!sessionId) {
    throw new Error("Session ID not found in browser's cookies")
  }

  const { userInfo, sub } = await getAndStoreUserInfo(code, sessionId)
  console.log(`userInfo: ${JSON.stringify(userInfo, null, 2)}`)
  // console.log(`sub: ${JSON.stringify(sub, null, 2)}`)
  // if(userInfo["myinfo.name"] === 'HAROLD QUEK HE RE'){
  //   return(
  //     redirect('/not-found')
  //   )
  // }
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
    <div className="bg-white rounded-md py-12 px-8 flex flex-col max-w-lg min-w-fit">
      <div className="text-xl mx-auto text-center mb-8">
        Logged in successfully! 
        {/* {redirect('/home')} */}
      </div>
        </div>

    </main>
  )
}
