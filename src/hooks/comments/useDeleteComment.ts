import type { Ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import comments from '@/services/comments';

export function useDeleteComment(slug: Ref<string>) {
  return useMutation({ mutationFn: (id: number) => comments.deleteById(slug.value, id) });
}
