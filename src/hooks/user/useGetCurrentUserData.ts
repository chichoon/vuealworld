import { useQuery } from '@tanstack/vue-query';

import user from '@/services/user';
import type { UserData } from '@/types/userData';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';

export function useGetCurrentUserData() {
  return useQuery<UserData>(['signin'], user.get, {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
