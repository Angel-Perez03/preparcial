import { useEffect, useState } from "react";

type Review = {
  id: number;
  reviewer: string;
  comment: string;
  rating: number;
};

type Book = {
  id: number;
  title: string;
  publishingDate: string;
  image: string;
  description: string;
  reviews: Review[];
};

type Props = {
  bookId: number;
};

export default function BookDetail({ bookId }: Props) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/books/${bookId}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [bookId]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <img src={book.image} alt={book.title} className="w-48" />
      <p><strong>Publishing Date:</strong> {book.publishingDate}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <h2 className="text-xl font-semibold mt-4">Reviews</h2>
      <ul className="space-y-2">
        {book.reviews && book.reviews.length > 0 ? (
          book.reviews.map(review => (
            <li key={review.id} className="border rounded p-2">
              <p><strong>{review.reviewer}</strong> rated {review.rating}/5</p>
              <p>{review.comment}</p>
            </li>
          ))
        ) : (
          <li>No reviews yet.</li>
        )}
      </ul>
    </div>
  );
}