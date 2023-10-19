import { useQuery } from '@tanstack/vue-query';

import type { CommentData } from '@/types/comments';
import comments from '@/services/comments';

export function useGetComments(slug: string | string[]) {
  if (Array.isArray(slug)) slug = slug.join('');
  return useQuery<CommentData[]>(['comments', slug], () => comments.get(slug as string));
}
