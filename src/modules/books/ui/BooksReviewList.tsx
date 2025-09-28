"use client";

import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8080/api";

export type Review = {
  id: number;
  reviewer?: string;
  rating?: number;   // 1..5
  comment?: string;
  date?: string;     // ISO
};

type Props = { bookId: number };

export default function BookReviewsList({ bookId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // GET /books/{id}/reviews
        const res = await fetch(`${API}/books/${bookId}/reviews`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Review[] = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message ?? "No se pudieron cargar las reviews.");
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

  if (loading) return <p>Cargando reviews...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!reviews.length) return <p className="text-gray-600">Este libro aún no tiene reviews.</p>;

  return (
    <ul className="space-y-3">
      {reviews.map((r) => (
        <li key={r.id} className="border rounded p-3 bg-white">
          <p className="font-semibold">
            {r.reviewer || "Anónimo"}{typeof r.rating === "number" ? ` — ${r.rating}/5` : ""}
          </p>
          {r.comment && <p className="text-sm mt-1">{r.comment}</p>}
          {r.date && <p className="text-xs text-gray-500 mt-1">{formatDate(r.date)}</p>}
        </li>
      ))}
    </ul>
  );
}
