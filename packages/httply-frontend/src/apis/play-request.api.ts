import type { HttplyEvent, HttplyRequest, HttplyResponse } from '@butopen/httply-model';
import { post } from './http.api';

export async function playRequest(url: string, options) {
  let result = { headers: {}, body: '' };
  const json = await post('https://httply.com/api/', { url, options });
  result.headers = json.response.headers;
  result.body = json.response.response;

  return result;
}

export async function saveRequest(request: HttplyRequest, response: HttplyResponse, domain: string) {
  const requestEvent: HttplyEvent = { request, response, domain };
  const resp = await post('/be/request', requestEvent);
  return resp;
}
