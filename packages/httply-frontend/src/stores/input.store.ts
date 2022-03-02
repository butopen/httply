import {loggedWritable} from '../shared/store.util';
import {fetchParser} from '../shared/fetch-parser';
import type {HttplyInput} from '../shared/httply.model';
import {
  updateHttpRequestHeaders,
  updateHttpRequestInformation,
  updateViewResetDevtool,
  updateWithNewRequest
} from './view.store';

export const inputStore = loggedWritable<HttplyInput>({
  httpInput: '',
  focused: false
});

export function updateEditorFocused(focused: boolean) {
  inputStore.update({ focused });
}

export function updateHttpInput(httpInput: string) {
  const request = fetchParser(httpInput);
  updateWithNewRequest(request);
  inputStore.update({httpInput, request});
}
