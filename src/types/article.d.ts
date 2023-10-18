import type { AuthorData } from './userData';

export interface ArticleEditData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  created: string;
  updated: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorData;
}

export interface ArticlesResponse {
  articles: ArticleData[];
  articlesCount: number;
}
