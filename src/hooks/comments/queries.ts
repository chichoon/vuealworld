export const commentKeys = {
  lists: {
    all: ['comments'] as const,
    article: (slug: string) => [...commentKeys.lists.all, slug] as const,
  },
  comment: {
    only: ['comment'] as const,
    id: (id: number) => [...commentKeys.comment.only, id] as const,
  },
};
