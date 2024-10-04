export const articlesInitialState: ArticlesState = {
  articles: [
    {
      title: '',
      description: '',
      image: '',
      email: '',
    },
  ],
  loading: false,
  config: {
    search: '',
    page: null,
    limit: null,
    sortField: null,
    sortOrder: null,
  },
};

export interface ArticlesState {
  articles: Articles[];
  loading: boolean;
  config: Nullable<ArticlesListConfig>;
}

export interface Articles {
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
