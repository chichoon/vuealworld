export interface ArticleEditData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ArticlesResponse {
  articles: ArticleData[];
  articlesCount: number;
}
