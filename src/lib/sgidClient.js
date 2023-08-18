import { SgidClient } from '@opengovsg/sgid-client'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL

const sgidClient = new SgidClient({
  clientId: String(process.env.SGID_CLIENT_ID),
  clientSecret: String(process.env.SGID_CLIENT_SECRET),
  privateKey: String(process.env.SGID_PRIVATE_KEY),
  redirectUri: `${NEXTAUTH_URL}/success`,
})

export { sgidClient }
