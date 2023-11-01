import type { ArticleEditData } from '@/01_application/ports/outbound/article';
import { httpClient } from './httpClient';
import type { Page, Slug, Tag, Text, Username } from '@/00_domain/common/value';

function post({ title, description, body, tagList }: ArticleEditData) {
  return httpClient({
    url: '/articles',
    method: 'POST',
    body: { article: { title, description, body, tagList } },
  });
}

interface GetParams {
  tag?: Tag;
  author?: Username;
  favorited?: Username;
  offset?: Page;
  limit?: Page;
}
function get({ tag, author, favorited, offset, limit }: GetParams) {
  return httpClient({
    url: '/articles',
    method: 'GET',
    params: { tag, author, favorited, offset, limit },
  }).then((data) => data);
}

interface GetFeedParams {
  offset?: Page;
  limit?: Page;
}

function getFeed({ offset, limit }: GetFeedParams) {
  return httpClient({
    url: '/articles/feed',
    method: 'GET',
    params: { offset, limit },
  }).then((data) => data);
}

function getBySlug(slug: Slug) {
  return httpClient({ url: `/articles/${slug}`, method: 'GET' }).then((data) => data.article);
}

interface PutParams {
  title: Text;
  description: Text;
  body: Text;
  tagList: Tag[];
}

function putBySlug(slug: Slug, { title, description, body, tagList }: PutParams) {
  return httpClient({
    url: `/articles/${slug}`,
    method: 'PUT',
    body: { article: { title, description, body, tagList } },
  });
}

function deleteBySlug(slug: Slug) {
  return httpClient({ url: `/articles/${slug}`, method: 'DELETE' });
}

function postFavorite(slug: Slug) {
  return httpClient({ url: `/articles/${slug}/favorite`, method: 'POST' }).then((data) => data.article);
}

function deleteFavorite(slug: Slug) {
  return httpClient({ url: `/articles/${slug}/favorite`, method: 'DELETE' }).then((data) => data.article);
}

export default { get, post, getFeed, getBySlug, putBySlug, deleteBySlug, postFavorite, deleteFavorite };
