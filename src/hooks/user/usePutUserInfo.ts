import { useMutation } from '@tanstack/vue-query';

import user from '@/services/user';

export function usePutUserInfo() {
  return useMutation({
    mutationFn: user.put,
  });
}
