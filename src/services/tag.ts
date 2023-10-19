import { httpClient } from './httpClient';

function get() {
  return httpClient({
    url: '/tags',
    method: 'GET',
  }).then((data) => data.tags);
}

export default { get };
