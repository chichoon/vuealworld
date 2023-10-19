import { useMutation } from '@tanstack/vue-query';

import comments from '@/services/comments';

export function useDeleteComment(slug: string | string[]) {
  if (Array.isArray(slug)) slug = slug.join('');
  return useMutation([], (id: number) => comments.deleteById(slug as string, id), {});
}
