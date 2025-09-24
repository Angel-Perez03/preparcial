import BookList from "../../modules/books/ui/BooksList";

export default function BooksPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Lista de libros</h1>
      <p className="mt-4">Bienvenido a la lista de libros disponibles.</p>
      <BookList />
    </main>
  );
}
