"use client";

import { useEffect, useState } from "react";
import { Book as BookModel } from "@/modules/books/types/books";
import { Review as ReviewModel } from "@/modules/books/types/Review";
import ReviewForm from "@/modules/books/ui/ReviewForm";
import type { ReviewFormData } from "@/modules/books/validation/reviewSchema";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";


type Review = ReviewModel;
type Book = BookModel & { reviews?: Review[] };

type Props = { bookId: number };

export default function BookDetail({ bookId }: Props) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/books/${bookId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Book = await res.json();
        setBook(data);
      } catch (e: any) {
        setError(e?.message ?? "No se pudo cargar el libro.");
      } finally {
        setLoading(false);
      }
    })();
  }, [bookId]);

  const formatDate = (s?: string) => {
    if (!s) return "";
    const d = new Date(s);
    return isNaN(d.getTime()) ? s : d.toLocaleDateString();
  };

  async function handleAddReview(data: ReviewFormData) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API}/books/${bookId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created: Review = await res.json();

      // Actualiza la lista local 
      setBook((prev) =>
        prev
          ? { ...prev, reviews: [created, ...(prev.reviews ?? [])] }
          : prev
      );
    } catch (e: any) {
      setError(e?.message ?? "No se pudo crear el review.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!book) return <div>No se encontró el libro</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      {book.image && <img src={book.image} alt={book.title} className="w-48 rounded border" />}
      <p><strong>Publishing Date:</strong> {formatDate(book.publishingDate)}</p>
      <p><strong>Description:</strong> {book.description || "Sin descripción"}</p>

      {/* Form para agregar review */}

      <h2 className="text-xl font-semibold mt-2">Reviews</h2>
      <ul className="space-y-2">
        {book.reviews?.length ? (
          book.reviews.map((r) => (
            <li key={r.id} className="border rounded p-2">
              <p>
                <strong>{r.reviewer || "Anónimo"}</strong>
                {typeof r.rating === "number" ? ` — ${r.rating}/5` : ""}
              </p>
              {r.comment && <p>{r.comment}</p>}
              {r.date && <p className="text-xs text-gray-500">{formatDate(r.date)}</p>}
            </li>
          ))
        ) : (
          <li>No reviews yet.</li>
        )}
      </ul>
    </div>
  );
}
