import type { Ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import profile from '@/services/profile';

export function useDeleteFollow(username: Ref<string>) {
  return useMutation({ mutationFn: () => profile.unfollow(username.value) });
}
