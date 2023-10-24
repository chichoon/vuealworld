import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';
import { articleKeys } from './queries';

export function useDeleteArticle(queryClient: QueryClient, slug: Ref<string>) {
  return useMutation({
    mutationFn: () => articles.deleteBySlug(slug.value),
    onSettled: () => {
      queryClient.invalidateQueries(articleKeys.lists.all);
    },
  });
}
