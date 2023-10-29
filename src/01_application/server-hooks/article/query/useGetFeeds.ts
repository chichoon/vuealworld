import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import articles from '@/02_adapter/services/articles';
import type { ArticlesResponse } from '@/01_application/ports/article';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { articleKeys } from '../query-key';

export function useGetFeeds(page: Ref<number>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.feed.paged(page),
    queryFn: () => articles.getFeed({ offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    keepPreviousData: true,
  });
}
