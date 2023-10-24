import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

export function useDeleteArticle(slug: string) {
  return useMutation({
    mutationFn: () => articles.deleteBySlug(slug),
  });
}
