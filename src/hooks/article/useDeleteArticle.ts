import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';
import { CACHE_TIME } from '@/utils/constants';

export function useDeleteArticle(slug: string) {
  return useMutation({
    mutationFn: () => articles.deleteBySlug(slug),
    cacheTime: CACHE_TIME,
  });
}
