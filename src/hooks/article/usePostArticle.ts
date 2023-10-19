import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

export function usePostArticle() {
  return useMutation([], articles.post);
}
