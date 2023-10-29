import type { ArticleEditData } from '@/domain/entity/article';
import { httpClient } from './httpClient';

function post({ title, description, body, tagList }: ArticleEditData) {
  return httpClient({
    url: '/articles',
    method: 'POST',
    body: { article: { title, description, body, tagList } },
  });
}

interface GetParams {
  tag?: string;
  author?: string;
  favorited?: string;
  offset?: number;
  limit?: number;
}
function get({ tag, author, favorited, offset, limit }: GetParams) {
  return httpClient({
    url: '/articles',
    method: 'GET',
    params: { tag, author, favorited, offset, limit },
  }).then((data) => data);
}

interface GetFeedParams {
  offset?: number;
  limit?: number;
}

function getFeed({ offset, limit }: GetFeedParams) {
  return httpClient({
    url: '/articles/feed',
    method: 'GET',
    params: { offset, limit },
  }).then((data) => data);
}

function getBySlug(slug: string) {
  return httpClient({ url: `/articles/${slug}`, method: 'GET' }).then((data) => data.article);
}

interface PutParams {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

function putBySlug(slug: string, { title, description, body, tagList }: PutParams) {
  return httpClient({
    url: `/articles/${slug}`,
    method: 'PUT',
    body: { article: { title, description, body, tagList } },
  });
}

function deleteBySlug(slug: string) {
  return httpClient({ url: `/articles/${slug}`, method: 'DELETE' });
}

function postFavorite(slug: string) {
  return httpClient({ url: `/articles/${slug}/favorite`, method: 'POST' }).then((data) => data.article);
}

function deleteFavorite(slug: string) {
  return httpClient({ url: `/articles/${slug}/favorite`, method: 'DELETE' }).then((data) => data.article);
}

export default { get, post, getFeed, getBySlug, putBySlug, deleteBySlug, postFavorite, deleteFavorite };
