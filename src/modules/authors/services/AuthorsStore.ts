import type { Author } from "@/modules/authors/types/author";

export class AuthorsStore {
  private _items: Author[] = [];
  get items() { return this._items; }
  set(items: Author[]) { this._items = items; }
  removeById(id: number) { this._items = this._items.filter(a => a.id !== id); }

  async optimisticDelete(id: number, deleter: () => Promise<void>) {
    const snapshot = [...this._items];
    this.removeById(id);
    try { await deleter(); }
    catch (e) { this._items = snapshot; throw e; }
  }
}
