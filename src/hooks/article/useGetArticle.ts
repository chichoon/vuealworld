import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticleData } from '@/types/article';

export function useGetArticle(slug: string | string[]) {
  if (Array.isArray(slug)) slug = slug.join('');
  return useQuery<ArticleData>(['article', slug], () => articles.getBySlug(slug as string));
}
