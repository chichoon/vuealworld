import type { Ref } from 'vue';

export const commentKeys = {
  lists: {
    all: ['comments'] as const,
    article: (slug: Ref<string>) => [...commentKeys.lists.all, slug] as const,
  },
  comment: {
    only: ['comment'] as const,
    id: (id: Ref<number>) => [...commentKeys.comment.only, id] as const,
  },
};
