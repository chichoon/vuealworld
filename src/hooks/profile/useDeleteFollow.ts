import profile from '@/services/profile';
import { useMutation } from '@tanstack/vue-query';

export function useDeleteFollow(username: string) {
  return useMutation([], () => profile.unfollow(username));
}
