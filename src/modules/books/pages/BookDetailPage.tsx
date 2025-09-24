import { useRouter } from "next/router";
import BookDetail from "../ui/BookDetail";

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>Loading...</div>;

  return <BookDetail bookId={Number(id)} />;
}