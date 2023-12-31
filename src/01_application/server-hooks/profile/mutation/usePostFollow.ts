import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import type { Slug, Username } from '@/00_domain/common/value';
import profile from '@/02_adapter/services/profile';
import { profileKeys } from '../query-key';
import { articleKeys } from '@/01_application/server-hooks/article/query-key';

export function usePostFollow(queryClient: QueryClient, username: Ref<Username>, slug?: Ref<Slug>) {
  return useMutation({
    mutationFn: () => profile.follow(username.value),
    onMutate: async () => {
      await queryClient.cancelQueries(profileKeys.username(username));
      const prevData = queryClient.getQueryData(profileKeys.username(username));

      queryClient.setQueryData(profileKeys.username(username), (oldData: any) => ({
        ...oldData,
        following: true,
      }));

      if (slug) {
        queryClient.setQueryData(articleKeys.article.slug(slug), (oldData: any) => ({
          ...oldData,
          author: {
            ...oldData.author,
            following: true,
          },
        }));
      }

      return { prevData };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(profileKeys.username(username), context.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(profileKeys.username(username));
    },
  });
}
