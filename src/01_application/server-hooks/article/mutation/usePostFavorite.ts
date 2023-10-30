import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/02_adapter/services/articles';
import { articleKeys } from '../query-key';
import type { ArticleFavoriteParams } from './ArticleFavoriteParams';
import type { Slug } from '@/00_domain/common/value';

function handlePostFavoriteFromArticle(oldData: any) {
  return {
    ...oldData,
    favorited: true,
    favoritesCount: oldData.favoritesCount + 1,
  };
}

function handlePostFavoriteFromList(oldData: any, slug: Ref<Slug>) {
  return {
    ...oldData,
    articles: oldData.articles.map((article: any) =>
      article.slug === slug.value
        ? { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
        : article,
    ),
  };
}

export function usePostFavorite(queryClient: QueryClient, info?: ArticleFavoriteParams) {
  return useMutation({
    mutationFn: (slug: Ref<Slug>) => articles.postFavorite(slug.value),
    onMutate: async (slug: Ref<Slug>) => {
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
    onError: (_, slug: Ref<Slug>, context) => {
      if (context) queryClient.setQueryData(articleKeys.article.slug(slug), context.prevData);
    },
    onSettled: (_, __, slug: Ref<Slug>) => {
      queryClient.invalidateQueries(articleKeys.lists.all);
      queryClient.invalidateQueries(articleKeys.article.slug(slug));
    },
  });
}
