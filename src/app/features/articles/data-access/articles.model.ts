import { ArticleEntity } from './entities/article.entity';
import { Sort } from '../../../core/intefaces/sort.type';
import { EmailsToSend, Tag } from './dto/article.dto';

export const articlesInitialState: ArticlesState = {
  articles: [],
  loading: false,
  config: {
    search: '',
    page: 1,
    limit: 8,
    sortField: 'createdAt',
    sortOrder: 'ASC',
    tags: []
  },
  total: 0,
  tags: [],
  emails: []
};

export interface ArticlesState {
  articles: ArticleEntity[];
  loading: boolean;
  config: ArticlesListConfig;
  total: number;
  tags: Tag[],
  emails: EmailsToSend[]
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
  tags: Tag[];
}
