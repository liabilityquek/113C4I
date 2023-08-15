/**
 * We place the store in the global object to prevent it from being cleared whenever compilation happens
 */

// using Prisma and Postgres as database
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function storeSession(sessionId, session) {
  await prisma.session.upsert({
    where: { key: sessionId },
    update: { session_data: session },
    create: { key: sessionId, session_data: session },
  });
}

export async function getSession(sessionId) {
  const result = await prisma.session.findUnique({
    where: { key: sessionId }
  });
  if (result && typeof result.session_data === 'object' && result.session_data !== null) {
    return result.session_data;
  } else {
    return null;
  }
}

export async function deleteSession(sessionId) {
  try{
    const checkIfSessionExist = await prisma.session.findUnique({
      where: { key: sessionId }
    })
  
    if (checkIfSessionExist) {
      await prisma.session.delete({
        where: { key: sessionId },
      });
    }
  }catch(e){
    console.log(`error: ${e}`)
    // return null;
    throw new Error(`An error occurred while logging out: ${e}`)
  }
}
