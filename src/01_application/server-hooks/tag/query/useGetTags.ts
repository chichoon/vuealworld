import { useQuery } from '@tanstack/vue-query';

import tag from '@/02_adapter/services/tag';
import { CACHE_TIME, STALE_TIME } from '@/01_application/common/constants';
import { tagKeys } from '../query-key';

export function useGetTags() {
  return useQuery({
    queryKey: tagKeys.root,
    queryFn: () => tag.get(),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
