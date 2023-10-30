import type { CommentData } from '@/00_domain/entity/comment';
import { httpClient } from './httpClient';
import type { ID, Slug, Text } from '@/00_domain/common/value';

function get(slug: Slug): Promise<CommentData[]> {
  return httpClient({
    url: `/articles/${slug}/comments`,
    method: 'GET',
  }).then((data) => data.comments);
}

function post(slug: Slug, body: Text) {
  return httpClient({
    url: `/articles/${slug}/comments`,
    method: 'POST',
    body: { comment: { body } },
  });
}

function deleteById(slug: Slug, id: ID) {
  return httpClient({
    url: `/articles/${slug}/comments/${id}`,
    method: 'DELETE',
  });
}

export default { get, post, deleteById };
