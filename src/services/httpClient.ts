import { useCookies } from 'vue3-cookies';

interface Params {
  url: string;
  method: string;
  body?: object;
}

export async function httpClient({ url, method, body }: Params) {
  const { cookies } = useCookies();
  return await fetch('/api' + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: cookies.get('authorization'),
    },
    credentials: 'include',
    body: JSON.stringify(body),
  }).then(async (res) => {
    const json = await res.json();
    if (!res.ok) {
      if (!json.message) return Promise.reject('Server Error');
      return Promise.reject(json.message);
    } else return json;
  });
}
