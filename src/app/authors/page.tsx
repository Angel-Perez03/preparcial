import AuthorsList from "../../modules/authors/ui/AuthorsList";

export default function AuthorsPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Lista de autores</h1>
      <p className="mt-4">Bienvenido a la lista de autores Disponibles.</p>
      <AuthorsList />
    </main>
  );
}
