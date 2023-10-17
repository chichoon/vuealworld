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
    },
    body: JSON.stringify(body),
  }).then(async (res) => {
    const json = await res.json();
    if (!res.ok) {
      if (!json.errors || !json.errors.body) return Promise.reject('Server Error');
      return Promise.reject(json.errors.body.join(' '));
    } else return json;
  });
}
