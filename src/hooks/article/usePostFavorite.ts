import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';
import { articleKeys } from './queries';
import type { ArticleListInfoParams } from '@/types/article';

function handlePostFavoriteFromArticle(oldData: any) {
  return {
    ...oldData,
    favorited: true,
    favoritesCount: oldData.favoritesCount + 1,
  };
}

function handlePostFavoriteFromList(oldData: any, slug: Ref<string>) {
  return {
    ...oldData,
    articles: oldData.articles.map((article: any) =>
      article.slug === slug.value
        ? { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
        : article,
    ),
  };
}

export function usePostFavorite(queryClient: QueryClient, info?: ArticleListInfoParams) {
  return useMutation({
    mutationFn: (slug: Ref<string>) => articles.postFavorite(slug.value),
    onMutate: async (slug: Ref<string>) => {
      await queryClient.cancelQueries(articleKeys.article.slug(slug));
      const prevData = queryClient.getQueryData(articleKeys.article.slug(slug));

      if (prevData) queryClient.setQueryData(articleKeys.article.slug(slug), handlePostFavoriteFromArticle);

      if (!info) return { prevData };

      switch (info.type) {
        case 'feed': {
          queryClient.setQueryData(articleKeys.lists.feed.paged(info.page), (oldData: any) =>
            handlePostFavoriteFromList(oldData, slug),
          );
          break;
        }
        case 'global': {
          queryClient.setQueryData(articleKeys.lists.global.paged(info.page), (oldData: any) =>
            handlePostFavoriteFromList(oldData, slug),
          );
          break;
        }
        case 'favorited': {
          queryClient.setQueryData(articleKeys.lists.filtered.favorited(info.by!, info.page), (oldData: any) =>
            handlePostFavoriteFromList(oldData, slug),
          );
          break;
        }
        case 'author': {
          queryClient.setQueryData(articleKeys.lists.filtered.author(info.by!, info.page), (oldData: any) =>
            handlePostFavoriteFromList(oldData, slug),
          );
          break;
        }
        case 'tagged': {
          queryClient.setQueryData(articleKeys.lists.filtered.tagged(info.tag!, info.page), (oldData: any) =>
            handlePostFavoriteFromList(oldData, slug),
          );
          break;
        }
      }
      return { prevData };
    },
    onError: (_, slug: Ref<string>, context) => {
      if (context) queryClient.setQueryData(articleKeys.article.slug(slug), context.prevData);
    },
    onSettled: (_, __, slug: Ref<string>) => {
      queryClient.invalidateQueries(articleKeys.lists.all);
      queryClient.invalidateQueries(articleKeys.article.slug(slug));
    },
  });
}
