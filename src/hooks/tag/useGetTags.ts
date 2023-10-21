import { useQuery } from '@tanstack/vue-query';

import tag from '@/services/tag';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { tagKeys } from './queries';

export function useGetTags() {
  return useQuery({
    queryKey: tagKeys.root,
    queryFn: () => tag.get(),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
