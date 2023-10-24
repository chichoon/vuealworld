import type { Ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

export function useDeleteArticle(slug: Ref<string>) {
  return useMutation({
    mutationFn: () => articles.deleteBySlug(slug.value),
  });
}
