import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import type { Page } from '@/00_domain/common/value';
import type { ArticlesResponse } from '@/01_application/ports/inbound/article';
import { CACHE_TIME, STALE_TIME } from '@/01_application/common/constants';
import articles from '@/02_adapter/services/articles';
import { articleKeys } from '../query-key';

export function useGetFeeds(page: Ref<Page>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.feed.paged(page),
    queryFn: () => articles.getFeed({ offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    keepPreviousData: true,
  });
}
