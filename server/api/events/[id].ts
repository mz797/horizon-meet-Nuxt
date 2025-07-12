import { prisma } from '../../utils/prisma'
export default defineEventHandler(async (event) => {

  const id = getRouterParam(event, 'id')
  if (!id || typeof id !== 'string') {
    throw createError({ statusCode: 400, message: 'Missing or invalid ID' })
  }

  return await prisma.event.findFirst({
    where: { id },
    include: {
      organizer: { select: { name: true, id: true } },
      registration: { select: { id: true, userId: true } },
    },
  });
})