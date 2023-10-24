import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import profile from '@/services/profile';
import type { ProfileData } from '@/types/profileData';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { profileKeys } from './queries';

export function useGetProfile(username: Ref<string>) {
  return useQuery<ProfileData>({
    queryKey: profileKeys.username(username),
    queryFn: () => profile.get(username.value),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
