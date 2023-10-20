import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticlesResponse } from '@/types/article';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';

export function useGetFeeds(page: Ref<number>) {
  return useQuery<ArticlesResponse>(
    ['feeds', page],
    () => articles.getFeed({ offset: page.value * 10 - 10, limit: 10 }),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      keepPreviousData: true,
    },
  );
}
