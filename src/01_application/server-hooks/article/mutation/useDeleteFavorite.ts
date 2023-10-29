import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/02_adapter/services/articles';
import { articleKeys } from '../query-key';
import type { ArticleFavoriteParams } from './ArticleFavoriteParams';

function handleDeleteFavoriteFromArticle(oldData: any) {
  return {
    ...oldData,
    favorited: false,
    favoritesCount: oldData.favoritesCount - 1,
  };
}

function handleDeleteFavoriteFromList(oldData: any, slug: Ref<string>) {
  return {
    ...oldData,
    articles: oldData.articles.map((article: any) =>
      article.slug === slug.value
        ? { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
        : article,
    ),
  };
}

export function useDeleteFavorite(queryClient: QueryClient, info?: ArticleFavoriteParams) {
  return useMutation({
    mutationFn: (slug: Ref<string>) => articles.deleteFavorite(slug.value),
    onMutate: async (slug: Ref<string>) => {
      await queryClient.cancelQueries(articleKeys.article.slug(slug));
      const prevData = queryClient.getQueryData(articleKeys.article.slug(slug));

      if (prevData) queryClient.setQueryData(articleKeys.article.slug(slug), handleDeleteFavoriteFromArticle);

      if (!info) return { prevData };

      switch (info.type) {
        case 'feed': {
          queryClient.setQueryData(articleKeys.lists.feed.paged(info.page), (oldData: any) =>
            handleDeleteFavoriteFromList(oldData, slug),
          );
          break;
        }
        case 'global': {
          queryClient.setQueryData(articleKeys.lists.global.paged(info.page), (oldData: any) =>
            handleDeleteFavoriteFromList(oldData, slug),
          );
          break;
        }
        case 'favorited': {
          queryClient.setQueryData(articleKeys.lists.filtered.favorited(info.by!, info.page), (oldData: any) =>
            handleDeleteFavoriteFromList(oldData, slug),
          );
          break;
        }
        case 'author': {
          queryClient.setQueryData(articleKeys.lists.filtered.author(info.by!, info.page), (oldData: any) =>
            handleDeleteFavoriteFromList(oldData, slug),
          );
          break;
        }
        case 'tagged': {
          queryClient.setQueryData(articleKeys.lists.filtered.tagged(info.tag!, info.page), (oldData: any) =>
            handleDeleteFavoriteFromList(oldData, slug),
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
