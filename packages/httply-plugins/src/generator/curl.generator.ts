import { HttplyRequest } from "@butopen/httply-model";
import { HttplyGenerator } from "./generator";

export class CurlGenerator implements HttplyGenerator {
  paramDelimiter: "'" | '"' = "'";
  quoteDelimiter: "" | "^\\^" = "";

  constructor(private options: { target: "cmd" | "bash" } = { target: "cmd" }) {
    if (options.target == "cmd") {
      this.quoteDelimiter = "^\\^";
      this.paramDelimiter = '"';
    }
  }

  /**
   * given an HttplyRequest object, parse it and return curl command
   * @param: request
   * */
  generate(request: HttplyRequest): string {
    /*another possible param is a boolean selector for choose between cmd and bash curl syntax*/

    /** command will be formatted with the following syntax
     *   curl [-X ...] url [optional header and data!]
     */
    let curlCommand = [`curl`]; //always begin with curl keyword

    // handle HTTP method
    if (request.options.method != "GET") {
      curlCommand.push(`-X ${request.options.method}`);
    }

    // insert URL
    curlCommand.push(
      `${this.paramDelimiter}${request.url}${this.paramDelimiter}`
    );

    //handle parameters
    if (request.options.headers) {
      for (let headerKey in request.options.headers) {
        let rawHeaderValue = request.options.headers[headerKey];
        let headerValue =
          this.options.target == "bash"
            ? rawHeaderValue
            : rawHeaderValue.replace(/"/g, this.quoteDelimiter + '"');
        curlCommand.push(
          `-H ${this.paramDelimiter}${headerKey}:${headerValue}${this.paramDelimiter}`
        );
      }
    }

    //handle data
    if (request.body) {
      curlCommand.push(`-d '${request.body}'`);
    }

    return curlCommand.join(" ");
  }
}
