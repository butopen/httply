import { playRequest, saveRequest } from '../apis/play-request.api';
import { updateResponse, updateShareLink } from '../stores/view.store';
import type { HttplyRequest, HttplyResponse } from '@butopen/httply-model';
import { copyToClipboard } from '../shared/clipboard.util';
import { updateNotification } from '../components/notification/notification.store';

export async function play(request: HttplyRequest, domain: string) {
  const { url, options } = request;
  const response = await playRequest(url, options);
  updateResponse(response);
  const savedResponse = await saveRequest(request, response as HttplyResponse, domain);
  const shareUrl = `https://httply.com/h/${savedResponse.meta}`;
  updateShareLink(shareUrl);
  share(shareUrl);
}

export function share(url: string) {
  copyToClipboard(url);
  updateNotification(`<div class="text-center truncate text-xs ">${url}<br>
                                <b class="text-green-400">COPIED</b> - <b class="text-gray-700">Httply link copied. Share it now!</b></div>`);
}
