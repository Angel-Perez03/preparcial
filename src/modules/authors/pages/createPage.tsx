"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "@/modules/authors/ui/AuthorForm";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";

export default function CreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      router.push("/authors");
      router.refresh();
    } catch (e: any) {
      setError(e?.message ?? "No se pudo crear el autor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Autor</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <AuthorForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
