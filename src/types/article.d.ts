import type { AuthorData } from './userData';

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorData;
}

export interface ArticlesResponse {
  articles: ArticleData[];
  articlesCount: number;
}
