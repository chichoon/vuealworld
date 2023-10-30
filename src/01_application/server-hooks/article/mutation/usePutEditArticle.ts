import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/02_adapter/services/articles';
import { articleKeys } from '../query-key';
import type { Slug, Tag, Text } from '@/00_domain/common/value';

interface Params {
  title: Text;
  description: Text;
  body: Text;
  tagList: Tag[];
}

export function usePutEditArticle(queryClient: QueryClient, slug: Ref<Slug>) {
  return useMutation({
    mutationFn: ({ title, description, body, tagList }: Params) =>
      articles.putBySlug(slug.value, { title, description, body, tagList }),
    onMutate: async ({ title, description, body, tagList }: Params) => {
      await queryClient.cancelQueries(articleKeys.article.slug(slug));
      const prevData = queryClient.getQueryData(articleKeys.article.slug(slug));

      if (prevData)
        queryClient.setQueryData(articleKeys.article.slug(slug), (oldData: any) => ({
          ...oldData,
          title,
          description,
          body,
          tagList,
        }));

      return { prevData };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(articleKeys.article.slug(slug), context.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(articleKeys.lists.all);
      queryClient.invalidateQueries(articleKeys.article.slug(slug));
    },
  });
}
