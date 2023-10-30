import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import profile from '@/02_adapter/services/profile';
import type { ProfileData } from '@/00_domain/entity/profile';
import { CACHE_TIME, STALE_TIME } from '@/01_application/common/constants';
import { profileKeys } from '../query-key';

export function useGetProfile(username: Ref<string>) {
  return useQuery<ProfileData>({
    queryKey: profileKeys.username(username),
    queryFn: () => profile.get(username.value),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
