import type { Json } from '../shared/json.model';

const basePath = window.location.href.indexOf('http://localhost:3001') == 0 ? 'http://localhost:3002' : 'https://api.httply.com';

export async function post(path: string, body: any) {
  const url = path.startsWith('http') ? path : basePath + path;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const json = await resp.json();
  return json;
}
export async function get(path: string) {
  const url = path.startsWith('http') ? path : basePath + path;
  const resp = await fetch(url);
  const json = await resp.json();
  return json;
}
