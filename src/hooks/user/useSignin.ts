import { useMutation } from '@tanstack/vue-query';
import user from '@/services/user';

export function useSignin() {
  return useMutation(['signin'], user.postLogin, {
    onSuccess: () => {
      console.log('success login!');
    },
  });
}
