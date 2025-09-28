export class Review {
  id: number;
  reviewer?: string;
  rating: number;        // 1..5
  comment?: string;
  date?: string;         // ISO

  constructor(init?: Partial<Review>) {
    this.id = init?.id ?? 0;
    this.reviewer = init?.reviewer ?? "";
    this.rating = init?.rating ?? 5;
    this.comment = init?.comment ?? "";
    this.date = init?.date ?? "";
  }
}
