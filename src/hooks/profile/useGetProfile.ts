import { useQuery } from '@tanstack/vue-query';

import profile from '@/services/profile';
import type { UserData } from '@/types/userData';

export function useGetProfile(username: string) {
  const { data } = useQuery<UserData>(['profile', username], () => profile.get(username));

  return data;
}
