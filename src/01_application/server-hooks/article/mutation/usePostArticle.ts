import { useMutation } from '@tanstack/vue-query';

import articles from '@/02_adapter/services/articles';

export function usePostArticle() {
  return useMutation({
    mutationFn: articles.post,
  });
}
