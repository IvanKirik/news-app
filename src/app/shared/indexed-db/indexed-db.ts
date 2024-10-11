import Dexie, {Table} from "dexie";

class IndexDb<T> extends Dexie {
  public readonly news: Table<T, number>;

  constructor() {
    super('news-db');
    this.version(1).stores({
      news: '++id',
    });
  }
}

export const indexedDb = new IndexDb();
