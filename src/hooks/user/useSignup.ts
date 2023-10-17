import { useMutation } from '@tanstack/vue-query';

import user from '@/services/user';

export function useSignup() {
  return useMutation(['signup'], user.postRegister, {
    onSuccess: () => {
      console.log('success register!');
    },
  });
}
