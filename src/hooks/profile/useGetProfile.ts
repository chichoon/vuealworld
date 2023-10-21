import { useQuery } from '@tanstack/vue-query';

import profile from '@/services/profile';
import type { ProfileData } from '@/types/profileData';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { profileKeys } from './queries';

export function useGetProfile(username: string) {
  return useQuery<ProfileData>({
    queryKey: profileKeys.username(username),
    queryFn: () => profile.get(username),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
