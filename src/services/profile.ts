import type { ProfileData } from '@/types/profileData';
import { httpClient } from './httpClient';

function get(username: string) {
  return httpClient({
    url: `/profiles/${username}`,
    method: 'GET',
  }).then((data) => data.profile);
}

function follow(username: string) {
  return httpClient({
    url: `/profiles/${username}/follow`,
    method: 'POST',
  }).then((data) => data.profile);
}

function unfollow(username: string) {
  return httpClient({
    url: `/profiles/${username}/follow`,
    method: 'DELETE',
  }).then((data) => data.profile);
}

export default { get, follow, unfollow };
