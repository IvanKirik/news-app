import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Articles,
  ArticlesListConfig,
  Nullable,
  PaginatedArticlesResponse,
} from '../../ngxs/articles.model';
import { ApiService } from '../api/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly apiService = inject(ApiService);

  getAllArticles(
    config: Nullable<ArticlesListConfig>,
  ): Observable<PaginatedArticlesResponse<Articles>> {
    const params = this.prepareParams(config);
    return this.apiService.get<PaginatedArticlesResponse<Articles>>(
      'articles',
      params,
    );
  }

  private prepareParams(config: Nullable<ArticlesListConfig>): HttpParams {
    let params: HttpParams = new HttpParams();
    if (config.search) {
      params = params.set('search', config.search);
    }
    if (config.page) {
      params = params.set('page', config.page.toString());
    }
    if (config.limit) {
      params = params.set('limit', config.limit.toString());
    }
    if (config.sortField) {
      params = params.set('sortField', config.sortField);
    }
    if (config.sortOrder) {
      params = params.set('sortOrder', config.sortOrder);
    }

    return params;
  }
}
