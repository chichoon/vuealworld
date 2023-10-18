import user from '@/services/user';
import { useQuery } from '@tanstack/vue-query';
import type { SignInResponse } from '@/types/userData';

export function useGetCurrentUserData() {
  const { data } = useQuery<SignInResponse>(['signin'], user.get, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return data;
}
