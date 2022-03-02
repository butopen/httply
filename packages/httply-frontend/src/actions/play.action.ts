import { playRequest } from '../apis/play-request.api';
import { updateResponse } from '../stores/view.store';
import type { HttplyRequest } from '../shared/httply.model';

export async function play(request: HttplyRequest) {
  const { url, options } = request;
  const response = await playRequest(url, options);
  updateResponse(response);
}
