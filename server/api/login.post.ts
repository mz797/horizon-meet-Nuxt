import {H3Event} from "h3";
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt'
import {createSession} from "../utils/session";


const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { email, password } = body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return { errors: { general: "Incorrect email or password" } };
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return { errors: { general: "Incorrect email or password" } };

  await createSession(event, user.id, user.role, user.name);

  return { success: true };
})