import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticleData } from '@/types/article';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { articleKeys } from './queries';

export function useGetArticle(slug: string | string[]) {
  if (Array.isArray(slug)) slug = slug.join('');
  return useQuery<ArticleData>(articleKeys.article.slug(slug), () => articles.getBySlug(slug as string), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
