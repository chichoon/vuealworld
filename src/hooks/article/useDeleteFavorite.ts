import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

export function useDeleteFavorite(queryClient: QueryClient, slug: string) {
  return useMutation({
    mutationFn: () => articles.deleteFavorite(slug),
    onSuccess: () => {
      queryClient.cancelQueries(['article', slug]);
      queryClient.invalidateQueries(['articles']);
      // queryClient.setQueryData(['article', slug], (prev: any) => ({
      //   ...prev,
      //   favorited: false,
      //   favoritesCount: prev.favoritesCount - 1,
      // }));
    },
    onSettled: () => {
      queryClient.invalidateQueries(['article', slug]);
    },
  });
}
