import { useMutation } from '@tanstack/vue-query';
import { useCookies } from 'vue3-cookies';

import user from '@/services/user';
import type { UserData } from '@/types/userData';
import { CACHE_TIME } from '@/utils/constants';

export function useSignin() {
  const { cookies } = useCookies();
  return useMutation(['signin'], user.postLogin, {
    cacheTime: CACHE_TIME,
    onSuccess: (data: UserData) => {
      cookies.set('authorization', `Bearer ${data.token}`);
    },
  });
}
