import { useQuery } from '@tanstack/vue-query';

import profile from '@/services/profile';
import type { ProfileData } from '@/types/profileData';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';

export function useGetProfile(username: string) {
  return useQuery<ProfileData>(['profile', username], () => profile.get(username), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
