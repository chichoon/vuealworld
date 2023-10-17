interface Params {
  url: string;
  method: string;
  body?: object;
}

export async function httpClient({ url, method, body }: Params) {
  return await fetch('http://localhost:8080' + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(body),
  });
}
