import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';
import { articleKeys } from './queries';
import type { Ref } from 'vue';

export function usePostFavorite(queryClient: QueryClient, slug: Ref<string>) {
  return useMutation({
    mutationFn: () => articles.postFavorite(slug.value),
    onMutate: async () => {
      await queryClient.cancelQueries(articleKeys.article.slug(slug));
      const prevData = queryClient.getQueryData(articleKeys.article.slug(slug));

      queryClient.setQueryData(articleKeys.article.slug(slug), (oldData: any) => ({
        ...oldData,
        favorited: true,
        favoritesCount: oldData.favoritesCount + 1,
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

// MEMO: いいねを解除する
// MEMO: onSuccess는 mutation이 성공했을 경우 호출되는 함수
// MEMO: onSettled는 mutation의 성공 실패 여부와 상관없이 호출되는 함수
