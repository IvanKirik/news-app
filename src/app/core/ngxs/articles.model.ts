export const articlesInitialState: ArticlesState = {
  articles: [
    {
      id: 0,
      title: '',
      summary: '',
      content: '',
      author: {
        id: 0,
        name: '',
        profile_url: '',
      },
      published_at: '',
      updated_at: '',
      tags: [],
      image_url: '',
    },
  ],
  loading: false,
};

export interface ArticlesState {
  articles: Articles[];
  loading: boolean;
}

export interface Articles {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: Author;
  published_at: string;
  updated_at: string;
  tags: string[];
  image_url: string;
}

export interface Author {
  id: number;
  name: string;
  profile_url: string;
}
