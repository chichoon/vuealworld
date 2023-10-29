import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import comments from '@/02_adapter/services/comments';
import { commentKeys } from '../query-key';

export function usePostComment(queryClient: QueryClient, slug: Ref<string>) {
  return useMutation({
    mutationFn: (body: string) => comments.post(slug.value, body),
    onSettled: () => {
      queryClient.invalidateQueries(commentKeys.lists.article(slug));
    },
  });
}
