import BooksList from "@/modules/books/ui/BooksList";

export default function BooksPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Lista de libros</h1>
      <p className="mt-4">Consulta todos los libros disponibles.</p>
      <BooksList />
    </main>
  );
}
