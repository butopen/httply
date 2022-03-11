import type { HttplyRequest } from "@butopen/httply-model";
import { HttplyParser, ParseError } from "./parser";

function fetchExtractor(url, options) {
  return { url, options };
}

export class HttpParser implements HttplyParser {
  parse(text: string): HttplyRequest {
    try {
      return {
        url: text,
        timestamp: new Date().getTime(),
        options: {
          method: "GET",
        },
      };
    } catch (e) {
      throw new ParseError();
    }
  }

  canApply(text: string): boolean {
    return text.startsWith("http");
  }
}
