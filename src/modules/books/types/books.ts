// src/models/Book.ts
export class Book {
  id: number;
  title: string;
  publishingDate: string;
  description: string;
  image?: string;

  constructor(init?: Partial<Book>) {
    this.id = init?.id ?? 0;
    this.title = init?.title ?? "";
    this.publishingDate = init?.publishingDate ?? "";
    this.description = init?.description ?? "";
    this.image = init?.image ?? "";
  }
}
