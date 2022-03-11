import type { HttplyRequest } from "@butopen/httply-model";

export interface HttplyParser {
  canApply(text: string): boolean;

  parse(text: string): HttplyRequest;
}

export class ParseError extends Error {}
