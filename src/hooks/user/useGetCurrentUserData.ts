import user from '@/services/user';
import { useQuery } from '@tanstack/vue-query';

export function useGetCurrentUserData() {
  const { data } = useQuery(['signin'], user.get, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return data;
}
