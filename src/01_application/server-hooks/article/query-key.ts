import type { Ref } from 'vue';

import type { Page, Slug, Tag, Username } from '@/00_domain/common/value';

export const articleKeys = {
  // 게시글 목록에 관한 쿼리
  lists: {
    all: ['articles'] as const, // 전체 게시물 목록에 대한 쿼리
    feed: {
      all: () => [...articleKeys.lists.all, 'feeds'],
      paged: (page: Ref<Page>) => [...articleKeys.lists.all, 'feeds', page] as const,
    },
    global: {
      all: () => [...articleKeys.lists.all, 'global'],
      paged: (page: Ref<Page>) => [...articleKeys.lists.all, 'global', page] as const,
    },
    filtered: {
      favorited: (by: Ref<Username>, page: Ref<Page>) =>
        [...articleKeys.lists.global.all(), 'favorited', by, page] as const, // 좋아요한 게시물 목록에 대한 쿼리
      author: (by: Ref<Username>, page: Ref<Page>) => [...articleKeys.lists.global.all(), 'author', by, page] as const, // 작성자로 필터링한 게시물 목록에 대한 쿼리
      tagged: (tag: Ref<Tag>, page: Ref<Page>) => [...articleKeys.lists.global.all(), 'tagged', tag, page] as const, // 태그로 필터링한 게시물 목록에 대한 쿼리
    },
  },

  // 게시물 각각에 관한 쿼리
  article: {
    only: ['article'] as const,
    slug: (slug: Ref<Slug>) => [...articleKeys.article.only, slug] as const, // 게시물에 대한 쿼리
  },
};
