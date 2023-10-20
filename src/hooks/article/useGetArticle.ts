import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticleData } from '@/types/article';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';

export function useGetArticle(slug: string | string[]) {
  if (Array.isArray(slug)) slug = slug.join('');
  return useQuery<ArticleData>(['article', slug], () => articles.getBySlug(slug as string), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
