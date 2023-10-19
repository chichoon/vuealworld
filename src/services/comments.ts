import type { CommentData } from '@/types/comments';
import { httpClient } from './httpClient';

function get(slug: string): Promise<CommentData[]> {
  return httpClient({
    url: `/articles/${slug}/comments`,
    method: 'GET',
  }).then((data) => data.comments);
}

function post(slug: string, body: string) {
  return httpClient({
    url: `/articles/${slug}/comments`,
    method: 'POST',
    body: { comment: { body } },
  });
}

function deleteById(slug: string, id: number) {
  return httpClient({
    url: `/articles/${slug}/comments/${id}`,
    method: 'DELETE',
  });
}

export default { get, post, deleteById };
