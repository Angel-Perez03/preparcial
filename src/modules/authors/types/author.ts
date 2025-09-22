// src/models/Author.ts
export class Author {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image?: string;

  constructor(init?: Partial<Author>) {
    this.id = init?.id ?? 0;
    this.name = init?.name ?? "";
    this.birthDate = init?.birthDate ?? "";
    this.description = init?.description ?? "";
    this.image = init?.image ?? "";
  }
}
