import { httpClient } from './httpClient';

function get() {
  return httpClient({
    url: '/tags',
    method: 'GET',
  });
}

export default { get };
