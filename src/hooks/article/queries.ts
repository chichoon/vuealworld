import type { Ref } from 'vue';

export const articleKeys = {
  // 게시글 목록에 관한 쿼리
  lists: {
    all: ['articles'] as const, // 전체 게시물 목록에 대한 쿼리
    feed: {
      all: () => [...articleKeys.lists.all, 'feeds'],
      paged: (page: Ref<number>) => [...articleKeys.lists.all, 'feeds', page] as const,
    },
    global: {
      all: () => [...articleKeys.lists.all, 'global'],
      paged: (page: Ref<number>) => [...articleKeys.lists.all, 'global', page] as const,
    },
    filtered: {
      favorited: (by: Ref<string>, page: Ref<number>) =>
        [...articleKeys.lists.global.all(), 'favorited', by, page] as const, // 좋아요한 게시물 목록에 대한 쿼리
      author: (by: Ref<string>, page: Ref<number>) => [...articleKeys.lists.global.all(), 'author', by, page] as const, // 작성자로 필터링한 게시물 목록에 대한 쿼리
      tagged: (tag: Ref<string>, page: Ref<number>) =>
        [...articleKeys.lists.global.all(), 'tagged', tag, page] as const, // 태그로 필터링한 게시물 목록에 대한 쿼리
    },
  },

  // 게시물 각각에 관한 쿼리
  article: {
    only: ['article'] as const,
    slug: (slug: Ref<string>) => [...articleKeys.article.only, slug] as const, // 게시물에 대한 쿼리
  },
};
