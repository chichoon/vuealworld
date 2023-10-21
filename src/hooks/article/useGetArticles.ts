import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticlesResponse } from '@/types/article';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { articleKeys } from './queries';

interface Params {
  tag?: string;
  author?: string;
  favorited?: string;
}

export function useGetArticles(page: Ref<number>, params?: Params) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.global.paged(page.value),
    queryFn: () => articles.get({ ...params, offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    keepPreviousData: true,
  });
}
