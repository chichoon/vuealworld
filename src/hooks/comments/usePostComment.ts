import type { Ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import comments from '@/services/comments';

export function usePostComment(slug: Ref<string>) {
  return useMutation({ mutationFn: (body: string) => comments.post(slug.value, body) });
}
