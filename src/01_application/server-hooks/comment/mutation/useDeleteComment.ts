import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import comments from '@/02_adapter/services/comments';
import { commentKeys } from '../query-key';
import type { Slug } from '@/00_domain/common/value';

export function useDeleteComment(queryClient: QueryClient, slug: Ref<Slug>) {
  return useMutation({
    mutationFn: (id: number) => comments.deleteById(slug.value, id),
    onSettled: () => {
      queryClient.invalidateQueries(commentKeys.lists.article(slug));
    },
  });
}
