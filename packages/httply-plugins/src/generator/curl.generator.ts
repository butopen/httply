import { HttplyRequest } from "@butopen/httply-model";
import {HttplyGenerator} from "./generator";

export class CurlGenerator implements HttplyGenerator {

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
        if (request.options.method != 'GET') {
            curlCommand.push(`-X ${request.options.method}`);
        }

        // insert URL
        curlCommand.push(`${request.url}`);

        //handle parameters
        if(request.options.headers) {
            for (let headerKey in request.options.headers) {
                let headerValue = request.options.headers[headerKey];
                curlCommand.push(`-H '${headerKey}:${headerValue}'`)
            }
        }

        //handle data
        if(request.body){
            curlCommand.push(`-d ${request.body}`)
        }

        return curlCommand.join(" ");
    }


}