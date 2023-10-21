export const profileKeys = {
  root: ['profile'] as const,
  username: (username: string) => [...profileKeys.root, username] as const,
};
