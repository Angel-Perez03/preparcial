import { z } from "zod";

const urlOrEmpty = z.string().url("URL inválida").optional().or(z.literal(""));

export const authorSchema = z.object({
  // Autor
  name: z.string().min(1, "El nombre es obligatorio"),
  birthDate: z.string().min(1, "La fecha de nacimiento es obligatoria"),
  image: urlOrEmpty,
  description: z.string().min(1, "La descripción es obligatoria"),

  // Libro
  book_title: z.string().min(1, "El título del libro es obligatorio"),
  book_publicationDate: z.string().min(1, "La fecha de publicación es obligatoria"),
  book_image: urlOrEmpty,
  book_description: z.string().optional().or(z.literal("")),

  // Premio
  prize_name: z.string().min(1, "El nombre del premio es obligatorio"),
  // ← aquí el cambio: sin coerce
  prize_year: z.number().int().min(1, "Año inválido"),
  prize_description: z.string().optional().or(z.literal("")),
});

export type AuthorFormData = z.infer<typeof authorSchema>;
