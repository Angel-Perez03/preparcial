"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Book as BookModel } from "@/modules/books/types/books";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";


type Book = BookModel; // para usar tus campos (publishingDate)

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/books`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (e: any) {
        setError(e?.message ?? "No se pudo cargar la lista de libros.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatDate = (s?: string) => {
    if (!s) return "";
    const d = new Date(s);
    return isNaN(d.getTime()) ? s : d.toLocaleDateString();
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!books.length) return <p className="text-gray-600">No hay libros para mostrar.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((b) => (
        <Link
          key={b.id}
          href={`/books/${b.id}`}
          className="border rounded overflow-hidden hover:shadow transition bg-white"
        >
          <div className="aspect-[16/9] bg-gray-100">
            {b.image && <img src={b.image} alt={b.title} className="w-full h-full object-cover" loading="lazy" />}
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-sm text-gray-700 mt-1">
              {b.description ? (b.description.length > 160 ? b.description.slice(0, 160) + "…" : b.description) : "Sin descripción"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Publicación: {formatDate(b.publishingDate)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
