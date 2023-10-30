import type { Page, Tag, Username } from '@/00_domain/common/value';

export interface ArticleFavoriteParams {
  type: 'feed' | 'global' | 'favorited' | 'author' | 'tagged';
  page: Ref<Page>;
  by?: Ref<Username>;
  tag?: Ref<Tag>;
}
