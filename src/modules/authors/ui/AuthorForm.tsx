"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "@/modules/authors/validation/authorSchema";

type Props = {
  onSubmit: SubmitHandler<AuthorFormData>;
  defaultValues?: Partial<AuthorFormData>;
  isSubmitting?: boolean;
  submitLabel?: string;
};

export default function AuthorForm({
  onSubmit,
  defaultValues,
  isSubmitting = false,
  submitLabel = "Save Author",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      image: "",
      description: "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input id="name" {...register("name")} className="mt-1 w-full rounded border px-3 py-2" />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium">Birth date (YYYY-MM-DD)</label>
        <input id="birthDate" type="date" {...register("birthDate")} className="mt-1 w-full rounded border px-3 py-2" />
        {errors.birthDate && <p className="text-red-600 text-sm">{errors.birthDate.message}</p>}
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
