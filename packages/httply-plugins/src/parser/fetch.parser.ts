import type { HttplyRequest } from "@butopen/httply-model";
import { HttplyParser, ParseError } from "./parser";

function fetchExtractor(url, options) {
  return { url, options };
}

export class FetchParser implements HttplyParser {
  parse(text: string): HttplyRequest {
    try {
      let { url, options } = new Function("fetch", `return ${text}`)(
        fetchExtractor
      );
      if (!options) options = { method: "GET" };
      return { url, options, timestamp: new Date().getTime() };
    } catch (e) {
      throw new ParseError();
    }
  }

  canApply(text: string): boolean {
    return text.startsWith("fetch");
  }
}
