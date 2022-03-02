export type HttplyMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE";
export type HttplyRequest = {
  url: string;
  options: {
    method: HttplyMethod;
    referrer?: string;
  };
};

export interface HttplyInput {
  httpInput: string;
  request?: HttplyRequest;
  focused: boolean;
}
