import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ArticlesListConfig,
  PaginatedArticlesResponse,
} from './articles.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ArticleDto, EmailsToSend, Tag } from './dto/article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleMapper } from './mappers/article.mapper';
import { CreateArticleDto } from './dto/create-article.dto';
import { Environment } from '../../../shared/intefaces';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly articleMapper = inject(ArticleMapper);
  private readonly http = inject(HttpClient);
  private readonly env = inject(Environment);

  public getAllArticles(
    config: ArticlesListConfig,
  ): Observable<PaginatedArticlesResponse<ArticleEntity>> {
    const params = this.prepareParams(config);
    return this.http
      .get<
        PaginatedArticlesResponse<ArticleDto>
      >(`${this.env.apiUrl}articles`, { params })
      .pipe(
        map((response) => ({
          ...response,
          data: response.data.map((item) => this.articleMapper.fromDto(item)),
        })),
      );
  }

  public getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.env.apiUrl}tags`);
  }

  public getEmails(): Observable<EmailsToSend[]> {
    return this.http.get<EmailsToSend[]>(`${this.env.apiUrl}emails`);
  }

  public createArticle(dto: CreateArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(`${this.env.apiUrl}articles/create`, dto);
  }

  private prepareParams(config: ArticlesListConfig): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.set('limit', config.limit.toString());
    params = params.set('page', config.page.toString());
    if (config.search) {
      params = params.set('search', config.search);
    }
    if (config.sortField) {
      params = params.set('sortField', config.sortField);
    }
    if (config.sortOrder) {
      params = params.set('sortOrder', config.sortOrder);
    }
    if (config.tags && config.tags.length) {
      params = params.set('tags', config.tags.map(({ id }) => id).join(','));
    }

    return params;
  }
}
