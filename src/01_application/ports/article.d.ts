import type { Tag, Text } from '@/00_domain/common/value';

export interface ArticleEditData {
  title: Text;
  description: Text;
  body: Text;
  tagList: Tag[];
}

export interface ArticlesResponse {
  articles: ArticleData[];
  articlesCount: number;
}
