import { loggedWritable } from "../shared/store.util";

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
      Referrer?: string;
    };
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
  Authorization: false,
};
export const viewStore = loggedWritable<ViewState>({
  request: { information: {} },
  sectionExpanded: sections,
});

export function updateHttpRequest(
  key: keyof ViewState["request"]["information"],
  value: string
) {
  viewStore.update((s) => {
    const information = { ...s.request.information, [key]: value };
    s.request = { ...s.request, information };
    return s;
  });
}

export function updateSection(
  key: keyof ViewState["sectionExpanded"],
  open: boolean
) {
  viewStore.update((s) => {
    s.sectionExpanded[key] = open;
    return s;
  });
}

export function updateResponse(response: ViewState["response"]) {
  viewStore.update({ response: response });
  updateSection("Response", true);
}
