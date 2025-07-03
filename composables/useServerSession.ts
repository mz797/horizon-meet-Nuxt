import {getCookie, H3Event} from 'h3'
import { decrypt } from '../server/utils/session'

export const useServerSession = async (event: H3Event) => {
  const sessionCookie = getCookie(event, 'session')
  const session = await decrypt(sessionCookie)

  if (!session?.user?.userId) {
    return { isAuth: false }
  }

  return {
    isAuth: true,
    userId: session.user.userId,
    userName: session.user.name,
  }
}
