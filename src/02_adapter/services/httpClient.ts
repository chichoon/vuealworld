import { useCookies } from 'vue3-cookies';

import createURLParams from '@/utils/createURLParams';
import { concatErrorMessage } from '@/utils/concatErrorMessage';

interface Params {
  url: string;
  method: string;
  params?: Record<string, string | number | undefined>;
  body?: object;
}

export async function httpClient({ url, method, params, body }: Params) {
  const { cookies } = useCookies();
  return await fetch('/api' + createURLParams(url, params), {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: cookies.get('authorization'),
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const json = await res.json();
      if (!res.ok) {
        if (!json.errors) return Promise.reject('Server Error');
        return Promise.reject(concatErrorMessage(json.errors));
      } else return json;
    })
    .catch((err) => {
      throw err;
    });
}