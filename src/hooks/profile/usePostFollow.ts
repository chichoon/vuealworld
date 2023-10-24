import type { Ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import profile from '@/services/profile';

export function usePostFollow(username: Ref<string>) {
  return useMutation({ mutationFn: () => profile.follow(username.value) });
}
