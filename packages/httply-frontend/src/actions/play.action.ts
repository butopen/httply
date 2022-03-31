import { playRequest, saveRequest } from '../apis/play-request.api';
import { updateResponse, updateShareLink } from '../stores/view.store';
import type { HttplyRequest, HttplyResponse } from '@butopen/httply-model';
import { copyToClipboard } from '../shared/clipboard.util';
import { updateNotification } from '../components/notification/notification.store';

export async function play(request: HttplyRequest, domain: string) {
  const { url, options, body } = request;
  if (body) {
    options.body = body;
  }
  const response = await playRequest(url, options);
  updateResponse(response);
  saveRequest(request, response as HttplyResponse, domain).then((savedResponse) => {
    const shareUrl = `${savedResponse.meta}`;
    updateShareLink(request, shareUrl);
  });
}

export function share(url: string) {
  copyToClipboard(url);
  updateNotification('Link copied into clipboard');
}
