import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticlesResponse } from '@/types/article';

interface Params {
  tag?: string;
  author?: string;
  favorited?: string;
}

export function useGetArticles(page: Ref<number>, params?: Params) {
  return useQuery<ArticlesResponse>(
    ['articles', page],
    () => articles.get({ ...params, offset: page.value * 10 - 10, limit: 10 }),
    {
      keepPreviousData: true,
    },
  );
}
