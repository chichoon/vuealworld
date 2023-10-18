import type { ArticleData } from '@/types/article';
import { httpClient } from './httpClient';

function post({ title, description, body, tagList }: ArticleData) {
  return httpClient({
    url: '/articles',
    method: 'POST',
    body: { article: { title, description, body, tagList } },
  }).then((data) => data.article);
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
  }).then((data) => data.articles);
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
  }).then((data) => data.articles);
}

function getBySlug(slug: string) {
  return httpClient({ url: `/articles/${slug}`, method: 'GET' }).then((data) => data.article);
}

function putBySlug(slug: string, { title, description, body }: ArticleData) {
  return httpClient({
    url: `/articles/${slug}`,
    method: 'PUT',
    body: { article: { title, description, body } },
  }).then((data) => data.article);
}

function deleteBySlug(slug: string) {
  return httpClient({ url: `/articles/${slug}`, method: 'DELETE' });
}

export default { get, post, getFeed, getBySlug, putBySlug, deleteBySlug };
