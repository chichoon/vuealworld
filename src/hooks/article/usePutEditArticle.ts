import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

interface Params {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export function usePutEditArticle(slug: string) {
  return useMutation([], ({ title, description, body, tagList }: Params) =>
    articles.putBySlug(slug, { title, description, body }),
  );
}
