"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BooksForm from "@/modules/books/ui/BooksForm";
import type { BookFormData } from "@/modules/books/validation/bookSchema";

const API = "http://127.0.0.1:8080/api";

export default function CreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = async (data: BookFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      router.push("/books");
      router.refresh();
    } catch (e: any) {
      setError(e?.message ?? "No se pudo crear el libro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear libro</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <BooksForm onSubmit={handleCreate} isSubmitting={isSubmitting} />
    </div>
  );
}
