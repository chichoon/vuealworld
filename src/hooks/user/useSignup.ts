import { useMutation } from '@tanstack/vue-query';
import { useCookies } from 'vue3-cookies';

import user from '@/services/user';
import type { UserData } from '@/types/userData';

export function useSignup() {
  const { cookies } = useCookies();
  return useMutation(['signup'], user.postRegister, {
    onSuccess: (data: UserData) => {
      cookies.set('authorization', `Bearer ${data.token}`);
    },
  });
}
