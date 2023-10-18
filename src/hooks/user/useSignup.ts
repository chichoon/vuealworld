import { useMutation } from '@tanstack/vue-query';
import { useCookies } from 'vue3-cookies';

import user from '@/services/user';
import type { SignInResponse } from '@/types/userData';

export function useSignup() {
  const { cookies } = useCookies();
  return useMutation(['signup'], user.postRegister, {
    onSuccess: (data: { user: SignInResponse }) => {
      cookies.set('authorization', `Bearer ${data.user.token}`);
    },
  });
}
