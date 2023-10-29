import type { Ref } from 'vue';

export const profileKeys = {
  root: ['profile'] as const,
  username: (username: Ref<string>) => [...profileKeys.root, username] as const,
};
