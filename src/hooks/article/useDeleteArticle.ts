import articles from '@/services/articles';
import { useMutation } from '@tanstack/vue-query';

export function useDeleteArticle(slug: string) {
  return useMutation([], () => articles.deleteBySlug(slug));
}
