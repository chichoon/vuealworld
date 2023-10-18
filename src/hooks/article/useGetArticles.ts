import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticlesResponse } from '@/types/article';

export function useGetArticles(page: number) {
  return useQuery<ArticlesResponse>(['articles', page], () => articles.get({ offset: page * 10 - 10, limit: 10 }), {
    keepPreviousData: true,
  });
}
