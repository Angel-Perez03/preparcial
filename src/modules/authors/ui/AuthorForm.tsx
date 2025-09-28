"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, type AuthorFormData } from "@/modules/authors/validation/authorSchema";

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
  submitLabel = "Crear Autor + Libro + Premio",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      // Autor
      name: "",
      birthDate: "",
      image: "",
      description: "",
      // Libro
      book_title: "",
      book_publicationDate: "",
      book_image: "",
      book_description: "",
      // Premio
      prize_name: "",
      prize_year: undefined as unknown as number,
      prize_description: "",
      ...defaultValues,
    },
  });

  const E = errors;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ================== AUTOR ================== */}
      <fieldset className="space-y-3 border p-4 rounded">
        <legend className="font-semibold">Autor</legend>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name*</label>
          <input id="name" {...register("name")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.name && <p className="text-red-600 text-sm">{E.name.message}</p>}
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium">Birth date* (YYYY-MM-DD)</label>
          <input id="birthDate" type="date" {...register("birthDate")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.birthDate && <p className="text-red-600 text-sm">{E.birthDate.message}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium">Image (URL)</label>
          <input id="image" {...register("image")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.image && <p className="text-red-600 text-sm">{E.image.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description*</label>
          <textarea id="description" rows={3} {...register("description")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.description && <p className="text-red-600 text-sm">{E.description.message}</p>}
        </div>
      </fieldset>

      {/* ================== LIBRO ================== */}
      <fieldset className="space-y-3 border p-4 rounded">
        <legend className="font-semibold">Libro</legend>

        <div>
          <label className="block text-sm font-medium">Título*</label>
          <input {...register("book_title")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.book_title && <p className="text-red-600 text-sm">{E.book_title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Fecha de publicación* (YYYY-MM-DD)</label>
          <input type="date" {...register("book_publicationDate")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.book_publicationDate && <p className="text-red-600 text-sm">{E.book_publicationDate.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Imagen (URL)</label>
          <input {...register("book_image")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.book_image && <p className="text-red-600 text-sm">{E.book_image.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea rows={2} {...register("book_description")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.book_description && <p className="text-red-600 text-sm">{E.book_description.message}</p>}
        </div>
      </fieldset>

      {/* ================== PREMIO ================== */}
      <fieldset className="space-y-3 border p-4 rounded">
        <legend className="font-semibold">Premio</legend>

        <div>
          <label className="block text-sm font-medium">Nombre*</label>
          <input {...register("prize_name")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.prize_name && <p className="text-red-600 text-sm">{E.prize_name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Año*</label>
          <input
            type="number"
            {...register("prize_year", { valueAsNumber: true })}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {E.prize_year && <p className="text-red-600 text-sm">{E.prize_year.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea rows={2} {...register("prize_description")} className="mt-1 w-full rounded border px-3 py-2" />
          {E.prize_description && <p className="text-red-600 text-sm">{E.prize_description.message}</p>}
        </div>
      </fieldset>

      <button type="submit" disabled={isSubmitting} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
        {isSubmitting ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
