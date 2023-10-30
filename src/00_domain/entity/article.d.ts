import type { Slug, Text, Timestamp } from '../common/value';

export interface ArticleData {
  slug: Slug;
  title: Text;
  description: Text;
  body: Text;
  tagList: Tag[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorData;
}
