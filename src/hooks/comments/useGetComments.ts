import { useQuery } from '@tanstack/vue-query';

import type { CommentData } from '@/types/comments';
import comments from '@/services/comments';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { commentKeys } from './queries';

export function useGetComments(slug: string | string[]) {
  if (Array.isArray(slug)) slug = slug.join('');
  return useQuery<CommentData[]>({
    queryKey: commentKeys.lists.article(slug),
    queryFn: () => comments.get(slug as string),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
