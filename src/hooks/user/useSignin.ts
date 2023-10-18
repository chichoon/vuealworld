import { useMutation } from '@tanstack/vue-query';
import { useCookies } from 'vue3-cookies';

import user from '@/services/user';
import type { UserData } from '@/types/userData';

export function useSignin() {
  const { cookies } = useCookies();
  return useMutation(['signin'], user.postLogin, {
    onSuccess: (data: { user: UserData }) => {
      cookies.set('authorization', `Bearer ${data.user.token}`);
    },
  });
}
