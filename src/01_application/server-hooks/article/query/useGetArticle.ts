import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import articles from '@/02_adapter/services/articles';
import type { ArticleData } from '@/00_domain/entity/article';
import { CACHE_TIME, STALE_TIME } from '@/01_application/common/constants';
import { articleKeys } from '../query-key';
import type { Slug } from '@/00_domain/common/value';

export function useGetArticle(slug: Ref<Slug>) {
  return useQuery<ArticleData>({
    queryKey: articleKeys.article.slug(slug),
    queryFn: () => articles.getBySlug(slug.value),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
}
