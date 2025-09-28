"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const reviewSchema = z.object({
  reviewer: z.string().optional().or(z.literal("")),
  rating: z.number().int().min(1, "Min 1").max(5, "Max 5"),
  comment: z.string().optional().or(z.literal("")),
});
export type ReviewFormData = z.infer<typeof reviewSchema>;

type Props = { onSubmit: SubmitHandler<ReviewFormData>; isSubmitting?: boolean };

export default function ReviewForm({ onSubmit, isSubmitting = false }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ReviewFormData>({
      resolver: zodResolver(reviewSchema),
      defaultValues: { reviewer: "", rating: 5, comment: "" },
    });

  const submit = (data: ReviewFormData) => {
    onSubmit(data);
    reset({ reviewer: "", rating: 5, comment: "" });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3 border rounded p-4 bg-white">
      <h3 className="font-semibold">Agregar review</h3>

      <div>
        <label className="block text-sm">Reviewer</label>
        <input {...register("reviewer")} className="w-full border rounded px-3 py-2" />
        {errors.reviewer && <p className="text-red-600 text-sm">{errors.reviewer.message}</p>}
      </div>

      <div>
        <label className="block text-sm">Rating (1–5)*</label>
        <input type="number" min={1} max={5} {...register("rating", { valueAsNumber: true })}
               className="w-full border rounded px-3 py-2" />
        {errors.rating && <p className="text-red-600 text-sm">{errors.rating.message}</p>}
      </div>

      <div>
        <label className="block text-sm">Comment</label>
        <textarea rows={2} {...register("comment")} className="w-full border rounded px-3 py-2" />
        {errors.comment && <p className="text-red-600 text-sm">{errors.comment.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
        {isSubmitting ? "Guardando..." : "Agregar review"}
      </button>
    </form>
  );
}
