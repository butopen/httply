import { loggedWritable } from '../shared/store.util';
import type { HttplyInput } from '../shared/httply.model';
import { updateWithNewRequest } from './view.store';
import type { HttplyRequest } from '@butopen/httply-model';
import { httpParsers } from '../plugins.configuration';
import type { HttplyParser } from '@butopen/httply-plugins';

export const inputStore = loggedWritable<HttplyInput>({
  httpInput: '',
  autoplay: true
});

export function updateAutoplay(autoplay: boolean) {
  inputStore.update({ autoplay });
}

export function updateHttpInput(httpInput: string) {
  let parser: HttplyParser;
  for (let p of httpParsers) {
    if (p.canApply(httpInput)) parser = p;
  }
  if (!parser) throw new Error('Input not supported');
  const request = parser.parse(httpInput);
  updateWithNewRequest(request);
  inputStore.update({ httpInput, request });
}
export function updateHttpInputWithoutParsing(httpInput: string, request: HttplyRequest) {
  inputStore.update({ httpInput, request });
}
