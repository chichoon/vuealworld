import user from '@/services/user';
import { useQuery } from '@tanstack/vue-query';

export function useGetUserData() {
  return useQuery(['signin'], user.get);
}
