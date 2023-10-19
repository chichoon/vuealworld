import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticlesResponse } from '@/types/article';

export function useGetFeeds(page: Ref<number>) {
  return useQuery<ArticlesResponse>(
    ['feeds', page],
    () => articles.getFeed({ offset: page.value * 10 - 10, limit: 10 }),
    {
      keepPreviousData: true,
    },
  );
}
