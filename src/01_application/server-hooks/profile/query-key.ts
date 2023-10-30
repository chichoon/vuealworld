import type { Username } from '@/00_domain/common/value';
import type { Ref } from 'vue';

export const profileKeys = {
  root: ['profile'] as const,
  username: (username: Ref<Username>) => [...profileKeys.root, username] as const,
};
