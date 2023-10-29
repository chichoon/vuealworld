import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/02_adapter/services/articles';
import { articleKeys } from '../query-key';

export function useDeleteArticle(queryClient: QueryClient, slug: Ref<string>) {
  return useMutation({
    mutationFn: () => articles.deleteBySlug(slug.value),
    onSettled: () => {
      queryClient.invalidateQueries(articleKeys.lists.all);
    },
  });
}
