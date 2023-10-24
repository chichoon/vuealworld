import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import comments from '@/services/comments';
import { commentKeys } from './queries';

export function usePostComment(queryClient: QueryClient, slug: Ref<string>) {
  return useMutation({
    mutationFn: (body: string) => comments.post(slug.value, body),
    onSettled: () => {
      queryClient.invalidateQueries(commentKeys.lists.article(slug));
    },
  });
}
