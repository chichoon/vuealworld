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

export interface ArticleListInfoParams {
  type: 'feed' | 'global' | 'favorited' | 'author' | 'tagged';
  page: Ref<number>;
  by?: Ref<string>;
  tag?: Ref<string>;
}
