import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import type { Slug, Text } from '@/00_domain/common/value';
import comments from '@/02_adapter/services/comments';
import { commentKeys } from '../query-key';

export function usePostComment(queryClient: QueryClient, slug: Ref<Slug>) {
  return useMutation({
    mutationFn: (body: Text) => comments.post(slug.value, body),
    onSettled: () => {
      queryClient.invalidateQueries(commentKeys.lists.article(slug));
    },
  });
}
