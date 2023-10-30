import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import type { CommentData } from '@/00_domain/entity/comment';
import type { Slug } from '@/00_domain/common/value';
import comments from '@/02_adapter/services/comments';
import { CACHE_TIME, STALE_TIME } from '@/01_application/common/constants';
import { commentKeys } from '../query-key';

export function useGetComments(slug: Ref<Slug>) {
  return useQuery<CommentData[]>({
    queryKey: commentKeys.lists.article(slug),
    queryFn: () => comments.get(slug.value),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
