import { z } from "zod";

export const reviewSchema = z.object({
  reviewer: z.string().optional().or(z.literal("")),           // opcional
  rating: z.number().int().min(1, "Min 1").max(5, "Max 5"),    // requerido 1..5
  comment: z.string().optional().or(z.literal("")),             // opcional
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
