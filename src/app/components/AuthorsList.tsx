"use client";

import { useEffect, useState } from "react";

export default function AuthorsList() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/api/authors");
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        const data = await res.json();
        setAuthors(data);
      } catch {
        setError("No se pudieron cargar los autores. Por favor, intente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthors();
  }, []);

  if (isLoading) {
    return <p>Cargando autores...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de autores</h2>
      <ul className="space-y-2">
        {authors.map((a) => (
          
          <li 
          key={a.id} 
          className="border p-2 rounded flex items-center space-x-4">
            <div className="contenedor-imagen">
              <img src={a.image} alt={a.name} className="w-16 h-16 rounded-full object-cover" />
            </div>
            <div>
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-gray-600">{a.birthDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
