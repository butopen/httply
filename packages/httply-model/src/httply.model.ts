export type Json =
  | void
  | Date
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [prop: string]: Json };

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
export type HttplyResponse = {
  headers: { [header: string]: string };
  body: Json | string;
  timestamp: number;
};
export type HttplyRequest = {
  url: string;
  timestamp: number;
  options: {
    method: HttplyMethod;
    referrer?: string;
    headers?:
       {
          referer?: string;
          Referer?: string;
       }
      | { [header: string]: string };
  };
  body?: string;
};

export interface HttplyEvent {
  domain: string;
  referer?: string;
  request: HttplyRequest;
  response: HttplyResponse;
}
