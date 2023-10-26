import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import articles from '@/services/articles';
import type { ArticlesResponse } from '@/types/article';
import { CACHE_TIME, STALE_TIME } from '@/utils/constants';
import { articleKeys } from './queries';

export function useGetArticles(page: Ref<number>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.global.paged(page),
    queryFn: () => articles.get({ offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}

export function useGetArticlesByTag(tag: Ref<string>, page: Ref<number>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.filtered.tagged(tag, page),
    queryFn: () => articles.get({ tag: tag.value, offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}

export function useGetArticlesByAuthor(author: Ref<string>, page: Ref<number>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.filtered.author(author, page),
    queryFn: () => articles.get({ author: author.value, offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}

export function useGetArticlesByFavorited(by: Ref<string>, page: Ref<number>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.filtered.favorited(by, page),
    queryFn: () => articles.get({ favorited: by.value, offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
