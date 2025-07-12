// server/api/events/[eventId]/register.post.ts
import { H3Event, getCookie, sendError } from 'h3'
import { decrypt } from '~/server/utils/session'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const eventId = event.context.params?.eventId

    if (!eventId) {
      createError({ statusCode: 400, statusMessage: 'Missing event ID' })
    }

    const sessionCookie = getCookie(event, 'session')
    const session = await decrypt(sessionCookie)
    const userId = session?.user?.userId

    if (!userId) {
      createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    await prisma.registration.create({
      data: {
        userId,
        eventId,
      },
    });
  } catch (error) {
    console.error('[register] error:', error)
    sendError(event, error)
  }
})
