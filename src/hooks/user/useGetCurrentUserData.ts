import { useQuery } from '@tanstack/vue-query';

import user from '@/services/user';
import type { UserData } from '@/types/userData';

export function useGetCurrentUserData() {
  return useQuery<UserData>(['signin'], user.get);
}
