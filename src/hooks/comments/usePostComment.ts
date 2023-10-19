import { useMutation } from '@tanstack/vue-query';

import comments from '@/services/comments';

export function usePostComment(slug: string | string[]) {
  if (Array.isArray(slug)) slug = slug.join('');
  return useMutation([], (body: string) => comments.post(slug as string, body));
}
