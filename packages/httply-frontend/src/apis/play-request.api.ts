export async function playRequest(url: string, options) {
  let result = { headers: {}, body: "" };
  try {
    const resp = await fetch(url, options);
    let text = await resp.text();
    result.body = text;
    try {
      const json = JSON.parse(text);
      result.body = json;
    } catch (e) {}
    resp.headers.forEach((hv, h) => {
      result.headers[h] = hv;
    });
  } catch (e) {
    const resp = await fetch("https://httply.com/api/", {
      method: "POST",
      body: JSON.stringify({ url, options }),
    });
    const json = await resp.json();
    result.headers = json.response.headers;
    result.body = json.response.response;
  }
  return result;
}
