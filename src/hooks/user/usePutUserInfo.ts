import { useMutation } from '@tanstack/vue-query';

import user from '@/services/user';

export function usePutUserInfo() {
  return useMutation(['signin'], user.put);
}
