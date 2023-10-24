import type { Ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

interface Params {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export function usePutEditArticle(slug: Ref<string>) {
  return useMutation({
    mutationFn: ({ title, description, body, tagList }: Params) =>
      articles.putBySlug(slug.value, { title, description, body, tagList }),
  });
}
