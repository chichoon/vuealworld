import { useMutation } from '@tanstack/vue-query';

import articles from '@/services/articles';

interface Params {
  title: string;
  description: string;
  body: string;
}

export function usePutEditArticle(slug: string, { title, description, body }: Params) {
  return useMutation([], () => articles.putBySlug(slug, { title, description, body }));
}
