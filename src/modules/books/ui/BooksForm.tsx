"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, BookFormData } from "@/modules/books/validation/bookSchema";
import { Book } from "../types/books";

type Props = {
  onSubmit: SubmitHandler<BookFormData>;
  defaultValues?: Partial<BookFormData>;
  isSubmitting?: boolean;
  submitLabel?: string;
};

export default function BookForm({
  onSubmit,
  defaultValues,
  isSubmitting = false,
  submitLabel = "Save Book",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      publishingDate: "",
      image: "",
      description: "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input id="title" {...register("title")} className="mt-1 w-full rounded border px-3 py-2" />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="publishingDate" className="block text-sm font-medium">Publishing date (YYYY-MM-DD)</label>
        <input id="publishingDate" type="date" {...register("publishingDate")} className="mt-1 w-full rounded border px-3 py-2" />
        {errors.publishingDate && <p className="text-red-600 text-sm">{errors.publishingDate.message}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium">Image (URL)</label>
        <input id="image" {...register("image")} className="mt-1 w-full rounded border px-3 py-2" />
        {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea id="description" rows={3} {...register("description")} className="mt-1 w-full rounded border px-3 py-2" />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
