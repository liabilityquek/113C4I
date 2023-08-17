export { default } from "next-auth/middleware"

import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  //Make login session valid for 1 hour
  const maxAge = 60 * 60 * 1
  switch (req.nextUrl.pathname) {
    case '/':
      // Generate new session ID
      const sessionId = req.cookies.get('sessionId')?.value || uuidv4()

      // Set session ID in cookie
      const res = NextResponse.next()
      res.cookies.set({
        name: 'sessionId',
        value: sessionId,
        httpOnly: true,
        secure: true,
        maxAge,
        sameSite: 'lax',
      })
      
      return res
    case '/logout':
      const logoutRes = NextResponse.next()
      logoutRes.cookies.delete('sessionId')
      return logoutRes
  }
}

// export const config = {
//   // ensures that any route other than those for the singpass, trainer, admin and api directories will be protected
//   matcher: ["/((?!|api|login|admin|trainer|singpass|https://api.id.gov.sg).*)"],
// };