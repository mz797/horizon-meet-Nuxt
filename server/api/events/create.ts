import {H3Event} from "h3";
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt'
import {createSession} from "../../utils/session";
import {verifySession} from "../../utils/dal";


const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const session = await verifySession(event)
  if (!session || !session.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const form = await readMultipartFormData(event)
  const fields: Record<string, any> = {}

  for (const part of form) {
    console.log(part)
    if (part.name === 'image') {
      fields.image = part
    } else {
      fields[part.name] = part.data.toString()
    }
  }
  // console.log(fields)

  if (!fields.image?.data) {
    throw createError({ statusCode: 400, statusMessage: 'No image picked' })
  }

  const formData = new FormData()
  formData.append(
    'file',
    new Blob([fields.image.data], { type: fields.image.type }),
    fields.image.filename
  )
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  const cloudinary = await res.json()
  fields.image = cloudinary.secure_url

  await prisma.event.create({
    data: {
      ...fields,
      date: new Date(fields.date),
      organizerId: session.userId,
    },
  })

  return { success: true }
})

