import { useQuery } from '@tanstack/vue-query';

import tag from '@/services/tag';

export function useGetTags() {
  return useQuery(['tags'], () => tag.get());
}
