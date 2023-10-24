import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticleData } from '@/types/article';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { articleKeys } from './queries';

export function useGetArticle(slug: Ref<string>) {
  return useQuery<ArticleData>({
    queryKey: articleKeys.article.slug(slug),
    queryFn: () => articles.getBySlug(slug.value),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
