"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import BookReviewsList, { type Review } from "@/modules/books/ui/BooksReviewList";
import ReviewForm, { type ReviewFormData } from "@/modules/books/ui/ReviewForm";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";


export default function BookReviewsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const bookId = Number(id);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!bookId) return <div>Cargando...</div>;

async function handleCreate(data: ReviewFormData) {
  setSubmitting(true);
  setError(null);
  try {
    const payload = {
      // manda las dos variantes por si el backend espera otra clave
      reviewer: data.reviewer?.trim() || "Anónimo",
      reviewerName: data.reviewer?.trim() || "Anónimo",
      rating: data.rating,
      comment: data.comment?.trim() || "",
    };

    const res = await fetch(`http://127.0.0.1:8080/api/books/${bookId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // refresca para ver la nueva review
    router.refresh();
  } catch (e: any) {
    setError(e?.message ?? "No se pudo crear el review.");
  } finally {
    setSubmitting(false);
  }
}


  return (
    <main className="container mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reviews del libro #{bookId}</h1>
        <button onClick={() => router.push(`/books/${bookId}`)}
                className="rounded border px-3 py-2">
          Volver al libro
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* Form opcional para agregar review aquí mismo */}
      <ReviewForm onSubmit={handleCreate} isSubmitting={submitting} />

      {/* Lista de reviews */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Listado</h2>
        <BookReviewsList bookId={bookId} />
      </section>
    </main>
  );
}
