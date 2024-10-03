import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Articles,
  ArticlesListConfig,
  PaginatedArticlesResponse,
} from '../../ngxs/articles.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly http = inject(HttpClient);
  private readonly apiService = inject(ApiService);

  getAllArticles(
    config?: Partial<ArticlesListConfig>,
  ): Observable<PaginatedArticlesResponse<Articles>> {
    return this.apiService.get<PaginatedArticlesResponse<Articles>>('articles');
  }
}
