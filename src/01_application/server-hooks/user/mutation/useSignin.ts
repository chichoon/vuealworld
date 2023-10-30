import { QueryClient, useMutation } from '@tanstack/vue-query';
import { useCookies } from 'vue3-cookies';

import user from '@/02_adapter/services/user';
import type { UserData } from '@/00_domain/entity/user';
import { CACHE_TIME } from '@/01_application/common/constants';
import { userKeys } from '../query-key';
import { articleKeys } from '@/01_application/server-hooks/article/query-key';

export function useSignin(queryClient: QueryClient) {
  const { cookies } = useCookies();
  return useMutation({
    mutationFn: user.postLogin,
    cacheTime: CACHE_TIME,
    onSuccess: (data: UserData) => {
      cookies.set('authorization', `Bearer ${data.token}`);
      queryClient.invalidateQueries(userKeys.current);
      queryClient.invalidateQueries(articleKeys.lists.all);
    },
  });
}
