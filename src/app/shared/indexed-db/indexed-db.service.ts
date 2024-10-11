import {Injectable} from "@angular/core";
import {indexedDb} from "./indexed-db";
import {IndexedDbCrud} from "./indexed-db.crud";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly indexDb = indexedDb;

  public news: IndexedDbCrud<unknown, number>;

  constructor() {
    this.news = new IndexedDbCrud<unknown, number>(
      this.indexDb.news
    );
  }
}
