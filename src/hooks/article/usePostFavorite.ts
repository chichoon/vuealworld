import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

export function usePostFavorite(queryClient: QueryClient, slug: string) {
  return useMutation({
    mutationFn: () => articles.postFavorite(slug),
    onSuccess: () => {
      queryClient.cancelQueries(['article', slug]);
      queryClient.invalidateQueries(['articles', 1]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['article', slug]);
    },
  });
}

// MEMO: いいねを解除する
// MEMO: onSuccess는 mutation이 성공했을 경우 호출되는 함수
// MEMO: onSettled는 mutation의 성공 실패 여부와 상관없이 호출되는 함수
