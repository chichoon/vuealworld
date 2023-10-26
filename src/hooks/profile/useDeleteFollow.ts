import type { Ref } from 'vue';
import { QueryClient, useMutation } from '@tanstack/vue-query';

import profile from '@/services/profile';
import { profileKeys } from './queries';
import { articleKeys } from '../article/queries';

export function useDeleteFollow(queryClient: QueryClient, username: Ref<string>, slug?: Ref<string>) {
  return useMutation({
    mutationFn: () => profile.unfollow(username.value),
    onMutate: async () => {
      await queryClient.cancelQueries(profileKeys.username(username));
      const prevData = queryClient.getQueryData(profileKeys.username(username));

      queryClient.setQueryData(profileKeys.username(username), (oldData: any) => ({
        ...oldData,
        following: false,
      }));

      if (slug) {
        queryClient.setQueryData(articleKeys.article.slug(slug), (oldData: any) => ({
          ...oldData,
          author: {
            ...oldData.author,
            following: false,
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
