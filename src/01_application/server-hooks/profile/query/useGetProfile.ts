import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import type { Username } from '@/00_domain/common/value';
import type { ProfileData } from '@/00_domain/entity/user';
import profile from '@/02_adapter/services/profile';
import { CACHE_TIME, STALE_TIME } from '@/01_application/common/constants';
import { profileKeys } from '../query-key';

export function useGetProfile(username: Ref<Username>) {
  return useQuery<ProfileData>({
    queryKey: profileKeys.username(username),
    queryFn: () => profile.get(username.value),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
