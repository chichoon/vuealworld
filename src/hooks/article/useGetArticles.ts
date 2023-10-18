import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';

export function useGetArticles(page: number) {
  return useQuery(['articles', page], () => articles.get({ offset: page * 10 - 10, limit: 10 }), {
    keepPreviousData: true,
  });
}
