import { getCookie } from 'h3'
import { decrypt } from '../../server/utils/session'

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, 'session')
  console.log(1, sessionCookie)
  const session = await decrypt(sessionCookie)
  console.log(2,session)

  if (!session?.user?.userId) {
    return { isAuth: false }
  }

  return {
    isAuth: true,
    userId: session.user.userId,
    userName: session.user.name,
  }
})