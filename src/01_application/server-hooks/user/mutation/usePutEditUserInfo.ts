import { useMutation } from '@tanstack/vue-query';

import user from '@/02_adapter/services/user';

export function usePutEditUserInfo() {
  return useMutation({
    mutationFn: user.put,
  });
}
