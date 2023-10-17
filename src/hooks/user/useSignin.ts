import { useMutation } from '@tanstack/vue-query';

import user from '@/services/user';
import type { SignInResponse } from '@/types/userData';

export function useSignin() {
  return useMutation(['signin'], user.postLogin, {
    onSuccess: (data: SignInResponse) => {
      const date = new Date();
      console.log(data);
      document.cookie = `Token=${data.user.token};expires=${date.setTime(date.getTime() + 1000 * 60 * 60 * 24)};path=/`;
      console.log('success login!');
    },
  });
}
