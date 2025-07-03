import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import {H3Event} from "h3";

const prisma = new PrismaClient()
export default defineEventHandler( async (event: H3Event) => {
  const body = await readBody(event);
  const { name, email, password } = body

  console.log(body);

  if (!name || !email || !password) {
    return {
      statusCode: 400,
      body: { message: 'All fields are required.' }
    }
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return {
      statusCode: 400,
      body: { message: 'User already exists.' }
    }
  }

  // Hash the password
  const hashedPassword = await hash(password, 10)

  // Create the user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return {
    statusCode: 200,
    body: {
      message: 'User created successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }

})