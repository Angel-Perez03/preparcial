"use client";

import { useState } from "react";
import type { Author } from "@/modules/authors/types/author";

type Props = {
  author: Author;
  onCancel: () => void;
  onSaved: (updated: Author) => void;
};

export default function EditAuthorForm({ author, onCancel, onSaved }: Props) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

// Convierte 'YYYY-MM-DDTHH:mm:ss.sssZ' a 'YYYY-MM-DD'
function toYYYYMMDD(s?: string) {
  if (!s) return "";
  const i = s.indexOf("T");
  return i >= 0 ? s.slice(0, i) : s;
}

  const [form, setForm] = useState({
    name: author.name ?? "",
    birthDate: toYYYYMMDD(author.birthDate), // <-- importante
    image: author.image ?? "",
    description: author.description ?? "",
  });


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (!form.name.trim() || !form.birthDate.trim()) {
        throw new Error("Name y birthDate son obligatorios.");
      }

      const res = await fetch(`http://127.0.0.1:8080/api/authors/${author.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: author.id, ...form }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated: Author = await res.json();
      onSaved(updated);
    } catch (err: any) {
      setError(err?.message ?? "No se pudo actualizar el autor.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded p-4 bg-white">
      <h3 className="font-semibold text-lg">Editar autor</h3>

      <div>
        <label className="block text-sm">Name*</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm">Birth date* (YYYY-MM-DD)</label>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm">Image (URL)</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
        <button type="button" onClick={onCancel} className="border rounded px-4 py-2">
          Cancelar
        </button>
      </div>
    </form>
  );
}
