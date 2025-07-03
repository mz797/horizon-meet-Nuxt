import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    email: z.string().email("Invalid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
  })
  .required();

export type signUpSchemaType = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export const createEventSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(3, 'Description is required'),
  date: z.string().refine(val => !!Date.parse(val), {
    message: 'Invalid date format',
  }),
  image: z.any().refine((f) => f instanceof File, {
    message: 'Image is required',
  }),
})

export type CreateEventSchemaType = z.infer<typeof createEventSchema>
