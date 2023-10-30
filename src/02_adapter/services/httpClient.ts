import { useCookies } from 'vue3-cookies';

import { concatErrorMessage, createURLParams } from '@/02_adapter/common/utils';
import type { HTTPMethod, URLString } from '@/00_domain/common/value';

interface Params {
  url: URLString;
  method: HTTPMethod;
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
