import { useQuery } from '@tanstack/vue-query';

import user from '@/services/user';
import type { UserData } from '@/types/userData';

export function useGetCurrentUserData() {
  const { data } = useQuery<UserData>(['signin'], user.get);

  return data;
}
