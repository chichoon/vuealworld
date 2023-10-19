import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

export function usePostFavorite(slug: string) {
  return useMutation(['article', slug], () => articles.postFavorite(slug));
}
