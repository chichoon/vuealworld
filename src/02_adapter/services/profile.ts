import type { Username } from '@/00_domain/common/value';
import { httpClient } from './httpClient';

function get(username: Username) {
  return httpClient({
    url: `/profiles/${username}`,
    method: 'GET',
  }).then((data) => data.profile);
}

function follow(username: Username) {
  return httpClient({
    url: `/profiles/${username}/follow`,
    method: 'POST',
  }).then((data) => data.profile);
}

function unfollow(username: Username) {
  return httpClient({
    url: `/profiles/${username}/follow`,
    method: 'DELETE',
  }).then((data) => data.profile);
}

export default { get, follow, unfollow };
