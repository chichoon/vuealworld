import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

export function useDeleteFavorite(slug: string) {
  return useMutation(['article', slug], () => articles.deleteFavorite(slug));
}
