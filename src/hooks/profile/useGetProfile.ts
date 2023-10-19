import { useQuery } from '@tanstack/vue-query';

import profile from '@/services/profile';
import type { ProfileData } from '@/types/profileData';

export function useGetProfile(username: string) {
  return useQuery<ProfileData>(['profile', username], () => profile.get(username));
}
