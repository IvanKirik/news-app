import { ArticleEntity } from './entities/article.entity';
import { Sort } from '../../../core/intefaces/sort.type';

export const articlesInitialState: ArticlesState = {
  articles: [],
  loading: false,
  config: {
    search: '',
    page: 1,
    limit: 8,
    sortField: 'createdAt',
    sortOrder: 'ASC',
  },
  total: 0,
};

export interface ArticlesState {
  articles: ArticleEntity[];
  loading: boolean;
  config: ArticlesListConfig;
  total: number;
}

export interface PaginatedArticlesResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ArticlesListConfig {
  search?: string;
  page: number;
  limit: number;
  sortField?: string;
  sortOrder?: Sort;
}

export type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};
