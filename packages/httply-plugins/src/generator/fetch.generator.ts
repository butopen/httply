import { HttplyRequest } from "@butopen/httply-model";
import { HttplyGenerator } from "./generator";

export class FetchGenerator implements HttplyGenerator {
  generate(request: HttplyRequest): string {
    return `fetch("${request.url}",${JSON.stringify(request.options)})`;
  }
}
