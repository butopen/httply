import { loggedWritable } from '../shared/store.util';
import { fetchParser } from '../shared/fetch-parser';
import type { HttplyInput } from '../shared/httply.model';
import { updateHttpRequestHeaders, updateHttpRequestInformation, updateViewResetDevtool, updateWithNewRequest } from './view.store';
import type { HttplyRequest } from '@butopen/httply-model';

export const inputStore = loggedWritable<HttplyInput>({
  httpInput: '',
  focused: false,
  autoplay: true
});

export function updateEditorFocused(focused: boolean) {
  inputStore.update({ focused });
}

export function updateAutoplay(autoplay: boolean) {
  inputStore.update({ autoplay });
}

export function updateHttpInput(httpInput: string) {
  const request = fetchParser(httpInput);
  updateWithNewRequest(request);
  inputStore.update({ httpInput, request });
}
export function updateHttpInputWithoutParsing(httpInput: string, request: HttplyRequest) {
  inputStore.update({ httpInput, request });
}
