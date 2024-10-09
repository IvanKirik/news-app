import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ArticlesListConfig,
  PaginatedArticlesResponse,
} from './articles.model';
import { ApiService } from '../../../core/services/api/api.service';
import { HttpParams } from '@angular/common/http';
import { ArticleDto } from './dto/article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleMapper } from './mappers/article.mapper';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly apiService = inject(ApiService);
  private readonly articleMapper = inject(ArticleMapper);

  getAllArticles(
    config: ArticlesListConfig,
  ): Observable<PaginatedArticlesResponse<ArticleEntity>> {
    const params = this.prepareParams(config);
    return this.apiService.get<PaginatedArticlesResponse<ArticleDto>>(
      'articles',
      params,
    ).pipe(map((response) => ({
      ...response,
      data: response.data.map((item) => this.articleMapper.fromDto(item)),
    })))
  }

  private prepareParams(config: ArticlesListConfig): HttpParams {
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
