import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ArticlesListConfig,
  PaginatedArticlesResponse,
} from './articles.model';
import { ApiService } from '../../../core/services/api/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ArticleDto, EmailsToSend, Tag } from './dto/article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleMapper } from './mappers/article.mapper';
import { CreateArticleDto } from './dto/create-article.dto';
import { Environment } from '../../../core/intefaces/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly apiService = inject(ApiService);
  private readonly articleMapper = inject(ArticleMapper);
  private readonly http = inject(HttpClient);
  private readonly environments = inject(Environment);

  public getAllArticles(
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

  public getTags(): Observable<Tag[]> {
    return this.apiService.get('tags');
  }

  public getEmails(): Observable<EmailsToSend[]> {
    return this.apiService.get('emails');
  }

  public createArticle(dto: CreateArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(this.environments.apiUrl + 'articles/create', dto);
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
    if (config.tags && config.tags.length) {
      params = params.set('tags', config.tags.map(({id}) => id).join(','));
    }

    return params;
  }
}
