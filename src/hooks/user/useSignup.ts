import { useMutation } from '@tanstack/vue-query';
import user from '@/services/user';

export function useSignup() {
  const { mutate } = useMutation(['signup'], user.postRegister, {
    onSuccess: () => {
      console.log('success register!');
    },
  });

  return { mutate };
}
