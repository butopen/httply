import { loggedWritable } from '../shared/store.util';
import type { HttplyRequest } from '../shared/httply.model';
import { formatDate } from '../shared/time';

export interface ViewState {
  sectionExpanded: {
    General: boolean;
    RequestHeaders: boolean;
    ResponseHeaders: boolean;
    Request: boolean;
    Response: boolean;
    Authorization: boolean;
  };
  request: {
    information: {
      Url?: string;
      Method?: string;
      Domain?: string;
      'Request Timestamp'?: string;
      'Response Timestamp'?: string;
      Referrer?: string;
    };
    headers?: { [h: string]: string };
  };
  response?: {
    headers: { [h: string]: string };
    body: any;
  };
}

const sections = {
  General: true,
  Request: false,
  RequestHeaders: false,
  ResponseHeaders: false,
  Response: false,
  Authorization: false
};
export const viewStore = loggedWritable<ViewState>({
  request: { information: {} },
  sectionExpanded: sections
});

export function updateViewResetDevtool() {
  viewStore.update((s) => {
    return {
      request: { information: {} },
      sectionExpanded: sections
    };
  });
}

export function updateWithNewRequest(request: HttplyRequest) {
  updateViewResetDevtool();
  if (request.options.headers) updateHttpRequestHeaders(request.options.headers);
  updateHttpRequestInformation('Url', request.url);
  updateHttpRequestInformation('Method', request.options.method);
  try {
    const referer = request.options.referrer || (request.options.headers && (request.options.headers.referer || request.options.headers.Referer));
    if (referer) {
      updateHttpRequestInformation('Referrer', referer);
      updateHttpRequestInformation('Domain', referer);
    }
  } catch (e) {}
  updateHttpRequestInformation('Request Timestamp', formatDate(request.timestamp));
}

export function updateHttpRequestHeaders(headers: { [h: string]: string }) {
  viewStore.update((s) => {
    s.request = { ...s.request, headers };
    return s;
  });
}

export function updateHttpRequestInformation(key: keyof ViewState['request']['information'], value: string) {
  viewStore.update((s) => {
    const information = { ...s.request.information, [key]: value };
    s.request = { ...s.request, information };
    return s;
  });
}

export function updateSection(key: keyof ViewState['sectionExpanded'], open: boolean) {
  viewStore.update((s) => {
    s.sectionExpanded[key] = open;
    return s;
  });
}

export function updateResponse(response: ViewState['response']) {
  viewStore.update({ response: response });
  updateHttpRequestInformation('Response Timestamp', formatDate(new Date()));
  updateSection('Response', true);
}
