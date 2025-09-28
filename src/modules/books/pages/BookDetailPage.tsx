"use client";

import { useParams } from "next/navigation";
import BookDetail from "../ui/BookDetail";

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  if (!id) return <div>Cargando...</div>;
  return <BookDetail bookId={id} />;
}
