import { loggedWritable } from "../shared/store.util";
import { fetchParser } from "../shared/fetch-parser";
import type { HttplyInput } from "../shared/httply.model";
import { updateHttpRequest } from "./view.store";

export const inputStore = loggedWritable<HttplyInput>({
  httpInput: "",
  focused: false,
});

export function updateEditorFocused(focused: boolean) {
  inputStore.update({ focused });
}

export function updateHttpInput(httpInput: string) {
  const request = fetchParser(httpInput);
  updateHttpRequest("Url", request.url);
  updateHttpRequest("Method", request.options.method);
  try {
    const referer =
      request.options.referrer ||
      (request.options.headers &&
        (request.options.headers.referer || request.options.headers.Referer));
    if (referer) {
      updateHttpRequest("Referrer", referer);
      updateHttpRequest("Domain", referer);
    }
  } catch (e) {}
  inputStore.update({ httpInput, request });
}
