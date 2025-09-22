import type { Author } from "@/modules/authors/types/author";

export class AuthorsApi {
  constructor(private base = "/_bk") {}

  async list(): Promise<Author[]> {
    const url = `${this.base}/api/authors`;
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`GET ${url} -> HTTP ${r.status}`);
    return r.json();
  }

  async delete(id: number): Promise<void> {
    const url = `${this.base}/api/authors/${id}`;
    const r = await fetch(url, { method: "DELETE" });
    if (!r.ok) throw new Error(`DELETE ${url} -> HTTP ${r.status}`);
  }

  async create(payload: Omit<Author, "id">): Promise<Author> {
    const url = `${this.base}/api/authors`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error(`POST ${url} -> HTTP ${r.status}`);
    return r.json();
  }
}
