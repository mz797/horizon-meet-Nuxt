import {verifySession} from "../utils/dal";
import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await verifySession(event)
  if (!session || !session.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const registrations = await prisma.registration.findMany({
    where: { userId: session.userId },
    include: {
      event: true,
    },
  });

  console.log(registrations)

  const events = registrations.map((reg) => reg.event);
  return events;

})