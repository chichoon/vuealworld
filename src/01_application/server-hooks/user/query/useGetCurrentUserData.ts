import { useQuery } from '@tanstack/vue-query';

import user from '@/services/user';
import type { UserData } from '@/00_domain/entity/user';
import { CACHE_TIME } from '@/01_application/common/constants';
import { userKeys } from '../query-key';

export function useGetCurrentUserData() {
  return useQuery<UserData>({
    queryKey: userKeys.current,
    queryFn: user.get,
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}