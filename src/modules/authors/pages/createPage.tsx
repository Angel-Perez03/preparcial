"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "@/modules/authors/ui/AuthorForm";
import type { AuthorFormData } from "@/modules/authors/validation/authorSchema";

const API = "http://127.0.0.1:8080/api";

function pickId(obj: any, keys: string[]) {
  for (const k of keys) if (obj && obj[k] != null) return obj[k];
  throw new Error("La respuesta del servidor no contiene un id.");
}

export default function CreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // 1) book
      const rBook = await fetch(`${API}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.book_title,
          publicationDate: data.book_publicationDate,
          image: data.book_image || undefined,
          description: data.book_description || undefined,
        }),
      });
      if (!rBook.ok) throw new Error(`No se pudo crear el libro (HTTP ${rBook.status})`);
      const book = await rBook.json();
      const bookId = pickId(book, ["id", "bookId"]);

      // 2) prize
      const rPrize = await fetch(`${API}/prizes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.prize_name,
          year: data.prize_year, 
          description: data.prize_description || undefined,
        }),
      });
      if (!rPrize.ok) throw new Error(`No se pudo crear el premio (HTTP ${rPrize.status})`);
      const prize = await rPrize.json();
      const prizeId = pickId(prize, ["id", "prizeId"]);

      // 3) author
      const rAuthor = await fetch(`${API}/authors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          birthDate: data.birthDate,
          image: data.image || undefined,
          description: data.description,
        }),
      });
      if (!rAuthor.ok) throw new Error(`No se pudo crear el autor (HTTP ${rAuthor.status})`);
      const author = await rAuthor.json();
      const authorId = pickId(author, ["id", "authorId"]);

      // 4) binds
      const b1 = await fetch(`${API}/authors/${authorId}/books/${bookId}`, { method: "POST" });
      if (!b1.ok) throw new Error(`No se pudo asociar el libro (HTTP ${b1.status})`);
      const b2 = await fetch(`${API}/prizes/${prizeId}/author/${authorId}`, { method: "POST" });
      if (!b2.ok) throw new Error(`No se pudo asociar el premio (HTTP ${b2.status})`);

      router.push("/authors");
      router.refresh();
    } catch (e: any) {
      setError(e?.message ?? "Ocurrió un error al crear los recursos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Autor</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <AuthorForm onSubmit={handleCreate} isSubmitting={isSubmitting} submitLabel="Crear Autor + Libro + Premio" />
    </div>
  );
}
