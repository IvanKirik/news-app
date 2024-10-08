export const articlesInitialState: ArticlesState = {
  articles: [
    {
      id: 0,
      title: '',
      description: '',
      image: '',
      email: '',
    },
  ],
  loading: false,
  config: {
    search: '',
    page: 1,
    limit: 3,
    sortField: null,
    sortOrder: null,
  },
  total: 0,
};

export interface ArticlesState {
  articles: Articles[];
  loading: boolean;
  config: Nullable<ArticlesListConfig>;
  total: number;
}

export interface Articles {
  id: number;
  title: string;
  description: string;
  image: string;
  email: string;
}

export interface PaginatedArticlesResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ArticlesListConfig {
  search: string;
  page: number;
  limit: number;
  sortField: string;
  sortOrder: string;
}

export type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};
