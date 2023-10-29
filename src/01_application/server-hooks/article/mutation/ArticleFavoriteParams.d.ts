export interface ArticleFavoriteParams {
  type: 'feed' | 'global' | 'favorited' | 'author' | 'tagged';
  page: Ref<number>;
  by?: Ref<string>;
  tag?: Ref<string>;
}
