"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/modules/books/types/books";

export default function AuthorsList() {
  const [books, SetBook] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar lista
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/api/books");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Book[] = await res.json();
        SetBook(data);
      } catch (e: any) {
        setError(e?.message ?? "No se pudo cargar la lista.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  // Convierte 'YYYY-MM-DDTHH:mm:ss.sssZ' a 'YYYY-MM-DD'
function toYYYYMMDD(s?: string) {
  if (!s) return "";
  const i = s.indexOf("T");
  return i >= 0 ? s.slice(0, i) : s; // si ya viene 'YYYY-MM-DD', lo deja igual
}

return (
    <div className="space-y-4">
      <ul className="divide-y border rounded bg-white">
        {books.map((a) => (
          <li key={a.id} className="p-3 flex items-center gap-4">

            <div className="flex items-center gap-4 flex-1">

              <img
                src={a.image ?? "/Images/Perfil1.png"}
                alt={`Foto de ${a.title}`}
                className="w-16 h-16 rounded-full object-cover border"
              />

              <div>
                <p className="font-semibold leading-tight">{a.title}</p>
                <p className="text-sm text-gray-600">{toYYYYMMDD(a.publishingDate)}</p>
              </div>

            </div>
            <div className="ml-auto flex gap-2">
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}