import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';
import { articleKeys } from './queries';

interface Params {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export function usePutEditArticle(queryClient: QueryClient, slug: Ref<string>) {
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
