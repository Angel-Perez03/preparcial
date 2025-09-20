import CreateAuthorForm from "@/components/CreateAuthorForm";

export default function CrearAuthorPage() {
  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear autor</h1>
      <CreateAuthorForm />
    </section>
  );
}