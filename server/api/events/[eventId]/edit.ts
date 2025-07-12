// import { prisma } from '~/server/utils/prisma'
export default defineEventHandler(async (event) => {
  try {

    const form = await readMultipartFormData(event)
    const fields: Record<string, any> = {}

    for (const part of form) {
      if (part.name === 'image') {
        fields.image = part
      } else {
        fields[part.name] = part.data.toString()
      }
    }

    if (!fields.image?.data) {
      throw createError({ statusCode: 400, statusMessage: 'No image picked' })
    }

    console.log(fields)


    // const event = await prisma.event.findUnique({
    //   where: { id: fields.id },
    // });
    //
    // if (!event) {
    //   new Error("This event doesen't exist");
    //   return;
    // }
    //
    // cloudinary.v2.config({
    //   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });
    //
    // // Jeśli istnieje stare zdjęcie, usuń je z Cloudinary
    // if (event.image && updatedEvent.image) {
    //   // Sprawdzamy, czy zdjęcie zostało zmienione
    //   const oldImagePublicId = event?.image?.split("/")?.pop()?.split(".")[0]; // Uzyskujemy public_id z URL
    //   if (oldImagePublicId)
    //     await cloudinary.v2.uploader.destroy(oldImagePublicId); // Usuwamy stare zdjęcie z Cloudinary
    // }
    //
    // const formData = new FormData();
    // formData.append("file", updatedEvent.image);
    // const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    // formData.append("upload_preset", preset as string); // Your Cloudinary upload preset
    //
    // // Send the FormData to Cloudinary (using fetch or axios)
    // const res = await fetch(
    //   `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );
    //
    // const data = await res.json();
    // updatedEvent.image = data.secure_url;
    //
    // await prisma.event.update({
    //   where: { id: eventId },
    //   data: {
    //     ...updatedEvent,
    //     date: new Date(updatedEvent.date),
    //   },
    // });
    return { success: true };
  } catch (err) {
    throw err;
  }
})