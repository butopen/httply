export type Json = void | Date | null | boolean | number | string | Json[] | { [prop: string]: Json };

export function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}
