import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import type { Page, Tag, Username } from '@/00_domain/common/value';
import type { ArticlesResponse } from '@/01_application/ports/inbound/article';
import { CACHE_TIME, STALE_TIME } from '@/01_application/common/constants';
import articles from '@/02_adapter/services/articles';
import { articleKeys } from '../query-key';

export function useGetArticles(page: Ref<Page>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.global.paged(page),
    queryFn: () => articles.get({ offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}

export function useGetArticlesByTag(tag: Ref<Tag>, page: Ref<Page>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.filtered.tagged(tag, page),
    queryFn: () => articles.get({ tag: tag.value, offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}

export function useGetArticlesByAuthor(author: Ref<Username>, page: Ref<Page>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.filtered.author(author, page),
    queryFn: () => articles.get({ author: author.value, offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}

export function useGetArticlesByFavorited(by: Ref<Username>, page: Ref<Page>) {
  return useQuery<ArticlesResponse>({
    queryKey: articleKeys.lists.filtered.favorited(by, page),
    queryFn: () => articles.get({ favorited: by.value, offset: page.value * 10 - 10, limit: 10 }),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
