import { get } from './http.api';
import { updateHttpInputWithoutParsing } from '../stores/input.store';
import { updateHttpRequestInformation, updateResponse, updateShareLink, updateWithNewRequest } from '../stores/view.store';
import type { HttplyEvent } from '@butopen/httply-model';
import { formatDate } from '../shared/time';
import { FetchGenerator } from '@butopen/httply-plugins';

export async function manageSharedUrl() {
  if (window.location.href.includes('/h/')) {
    const meta = window.location.href.split('/h/')[1];
    console.log('meta: ', meta);
    const result: HttplyEvent = await get(`/be/request/${meta}`);
    console.log('result: ', result);
    updateWithNewRequest(result.request);
    updateResponse(result.response);
    updateHttpRequestInformation('Request Timestamp', formatDate(result.request.timestamp));
    updateHttpRequestInformation('Response Timestamp', formatDate(result.response.timestamp));
    updateHttpRequestInformation('Domain', result.domain);
    updateHttpInputWithoutParsing(new FetchGenerator().generate(result.request), result.request);
    updateShareLink(`https://httply.com/h/${meta}`);
  }
}
