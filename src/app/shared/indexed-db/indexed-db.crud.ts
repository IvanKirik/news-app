import Dexie, {UpdateSpec} from "dexie";

export class IndexedDbCrud<T, Tkey> {
  public dbSet: Dexie.Table<T, Tkey>;

  constructor(dbSet: Dexie.Table<T, Tkey>) {
    this.dbSet = dbSet;
  }

  public getAll(): Promise<unknown[]> {
    return this.dbSet.toArray();
  }

  public async addBulkAsync(items: T[]) {
    const batchSize = 1000;
    let processed = 0;

    while (processed < items.length) {
      const batch = items.slice(processed, processed + batchSize);
      await this.dbSet.bulkPut(batch);
      processed += batchSize;
    }
  }

  public getById(id: Tkey) {
    return this.dbSet.get(id);
  }

  public async addAsync(item: T): Promise<void> {
    await this.dbSet.add(item);
  }

  public async addOrEditAsync(item: T): Promise<void> {
    await this.dbSet.put(item);
  }

  public async updateAsync(id: Tkey, changes: UpdateSpec<T>): Promise<void> {
    await this.dbSet.update(id, changes);
  }

  public async removeAsync(id: Tkey): Promise<void> {
    await this.dbSet.delete(id);
  }

  public async removeRangeAsync(ids: Tkey[]): Promise<void> {
    await this.dbSet.bulkDelete(ids);
  }
}
