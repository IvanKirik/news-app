import {inject, Injectable} from '@angular/core';
import {DbService} from "../../../core/indexed-db";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class                                                                                                                                                                                                                                                                                                                                              ArticlesService {
  private readonly dbService = inject(DbService);

  public getNews(): Observable<any[]> {
    return from(this.dbService.news.getAll());
  }

  public getNewsById(id: number): Observable<any> {
    return from(this.dbService.news.getById(id));
  }

  public create(dto: any): Observable<void> {
    return from(this.dbService.news.addAsync(dto));
  }

  public editNews(id: number, dto: any): Observable<void> {
    return from(this.dbService.news.updateAsync(id, dto));
  }

  public removeById(id: number): Observable<void> {
    return from(this.dbService.news.removeAsync(id));
  }

  public removeItems(ids: number[]): Observable<void> {
    return from(this.dbService.news.removeRangeAsync(ids));
  }
}
