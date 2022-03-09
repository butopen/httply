export async function playRequest(url: string, options) {
  let result = { headers: {}, body: '' };

  const resp = await fetch('https://httply.com/api/', {
    method: 'POST',
    body: JSON.stringify({ url, options })
  });
  const json = await resp.json();
  result.headers = json.response.headers;
  result.body = json.response.response;

  return result;
}
