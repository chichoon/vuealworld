import { useQuery } from '@tanstack/vue-query';

import user from '@/services/user';
import type { UserData } from '@/types/userData';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { userKeys } from './queries';

export function useGetCurrentUserData() {
  return useQuery<UserData>({
    queryKey: userKeys.current,
    queryFn: user.get,
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
