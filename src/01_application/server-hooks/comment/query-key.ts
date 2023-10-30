import type { Ref } from 'vue';

import type { ID, Slug } from '@/00_domain/common/value';

export const commentKeys = {
  lists: {
    all: ['comments'] as const,
    article: (slug: Ref<Slug>) => [...commentKeys.lists.all, slug] as const,
  },
  comment: {
    only: ['comment'] as const,
    id: (id: Ref<ID>) => [...commentKeys.comment.only, id] as const,
  },
};
