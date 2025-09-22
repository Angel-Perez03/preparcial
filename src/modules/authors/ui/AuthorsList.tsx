"use client";

import { useEffect, useState } from "react";
import type { Author } from "@/modules/authors/types/author";
import EditAuthorForm from "./EditAuthorForm";

export default function AuthorsList() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Author | null>(null);

  // Cargar lista
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/api/authors");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Author[] = await res.json();
        setAuthors(data);
      } catch (e: any) {
        setError(e?.message ?? "No se pudo cargar la lista.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // (Eliminar)
  async function handleDelete(id: number) {
    const ok = confirm("¿Eliminar este autor?");
    if (!ok) return;
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setAuthors((list) => list.filter((a) => a.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "No se pudo eliminar.");
    }
  }

  // (Editar)
  function handleSaved(updated: Author) {
    setAuthors((list) => list.map((a) => (a.id === updated.id ? updated : a)));
    setEditing(null);
  }

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
      {editing && (
        <EditAuthorForm
          author={editing}
          onCancel={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}

      <ul className="divide-y border rounded bg-white">
        {authors.map((a) => (
          <li key={a.id} className="p-3 flex items-center gap-4">

            <div className="flex items-center gap-4 flex-1">

              <img
                src={a.image ?? "/Images/Perfil1.png"}
                alt={`Foto de ${a.name}`}
                className="w-16 h-16 rounded-full object-cover border"
              />

              <div>
                <p className="font-semibold leading-tight">{a.name}</p>
                <p className="text-sm text-gray-600">{toYYYYMMDD(a.birthDate)}</p>
              </div>

            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setEditing(a)}
                className="px-3 py-1 rounded border"
              >

                Editar
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}