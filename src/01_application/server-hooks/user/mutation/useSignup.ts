import { useMutation } from '@tanstack/vue-query';
import { useCookies } from 'vue3-cookies';

import user from '@/services/user';
import type { UserData } from '@/00_domain/entity/user';
import { userKeys } from '../query-key';

export function useSignup() {
  const { cookies } = useCookies();
  return useMutation({
    mutationKey: userKeys.current,
    mutationFn: user.postRegister,
    onSuccess: (data: UserData) => {
      cookies.set('authorization', `Bearer ${data.token}`);
    },
  });
}
