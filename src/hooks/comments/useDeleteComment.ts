import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import comments from '@/services/comments';
import { commentKeys } from './queries';

export function useDeleteComment(queryClient: QueryClient, slug: Ref<string>) {
  return useMutation({
    mutationFn: (id: number) => comments.deleteById(slug.value, id),
    onSettled: () => {
      queryClient.invalidateQueries(commentKeys.lists.article(slug));
    },
  });
}
