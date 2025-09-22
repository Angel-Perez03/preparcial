import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Use format YYYY-MM-DD." }),
  image: z.string().url({ message: "Must be a valid URL." }).optional().or(z.literal("")),
  description: z.string().min(10, { message: "Description must be at least 10 characters long." })
               .optional().or(z.literal("")),
});

export type AuthorFormData = z.infer<typeof authorSchema>;
