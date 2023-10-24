import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';
import { articleKeys } from './queries';

export function useDeleteFavorite(queryClient: QueryClient, slug: Ref<string>) {
  return useMutation({
    mutationFn: () => articles.deleteFavorite(slug.value),
    onMutate: async () => {
      await queryClient.cancelQueries(articleKeys.article.slug(slug));
      const prevData = queryClient.getQueryData(articleKeys.article.slug(slug));

      if (prevData)
        queryClient.setQueryData(articleKeys.article.slug(slug), (oldData: any) => ({
          ...oldData,
          favorited: false,
          favoritesCount: oldData.favoritesCount - 1,
        }));

      return { prevData };
    },
    onError: (error, _, context) => {
      if (context) queryClient.setQueryData(articleKeys.article.slug(slug), context.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(articleKeys.lists.all);
      queryClient.invalidateQueries(articleKeys.article.slug(slug));
    },
  });
}
