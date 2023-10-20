import { useQuery } from '@tanstack/vue-query';

import tag from '@/services/tag';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';

export function useGetTags() {
  return useQuery(['tags'], () => tag.get(), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
