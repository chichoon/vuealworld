import { useMutation } from '@tanstack/vue-query';

import profile from '@/services/profile';

export function usePostFollow(username: string) {
  return useMutation([], () => profile.follow(username));
}
