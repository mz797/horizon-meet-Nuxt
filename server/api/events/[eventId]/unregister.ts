// server/api/events/[eventId]/register.post.ts
import { H3Event, getCookie, readBody} from 'h3'
import { decrypt } from '~/server/utils/session'
import { prisma } from '~/server/utils/prisma'
import type {Session} from "~/types/session";
export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event);

    const id = body.id


    if (!id) {
      createError({ statusCode: 400, statusMessage: 'Missing event ID' })
    }

    const sessionCookie = getCookie(event, 'session')
    const session = (await decrypt(sessionCookie)) as Session
    const userId = session?.user?.userId

    if (!userId) {
      createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    await prisma.registration.delete({ where: { id } });
  } catch (error) {
    console.error('[register] error:', error)
  }
})
