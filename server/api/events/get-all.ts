// import {verifySession} from "../../utils/dal";
import { prisma } from '../../utils/prisma'


export default defineEventHandler(async (event) => {
  // const session = await verifySession(event)
  // if (!session || !session.userId) {
  //   throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  // }

  const body = await readBody(event);
  const {pageNumber, rows} = body;
  try{
    const [events, count] = await prisma.$transaction([
      prisma.event.findMany({
        skip: Number(pageNumber) * Number(rows),
        take: Number(rows),
      }),
      prisma.event.count(),
    ]);

    return { events, count: Math.ceil(count / rows) };
  } catch(err) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch events' })
  }
})