import type { HttplyRequest } from "@butopen/httply-model";
import { HttplyParser, ParseError } from "./parser";
import { HttplyMethod } from "@butopen/httply-model";
import * as http from "http";

export class CurlParser implements HttplyParser {
    private regexExpression: RegExp = /[\s|']-/;

    parse(request: string): HttplyRequest {
        if (this.canApply(request)) {
            let parsedRequest = {
                options: {headers: {}, method: "GET"} as HttplyRequest["options"],
                url: "",
            } as HttplyRequest;

            const normalizedRequest = this.preFilterRequest(request);
            if (this.hasParams(normalizedRequest)) {
                let params = normalizedRequest.split(this.regexExpression);
                // console.log(params)
                params.forEach((element) => {
                    this.handleParam(element,parsedRequest) ;
                });
            } else {
                parsedRequest.url = normalizedRequest.split(" ")[1] || "";
            }
            parsedRequest.timestamp = new Date().getTime();
            console.log(parsedRequest)
            return parsedRequest;
        } else {
            throw new ParseError();
        }
    }

    /**
     * Check if param request starts with curl keyword
     * @param request
     */
    canApply(request: string): boolean {
        return request.trim().startsWith("curl");
    }

    /**
     * Check if there is some -Z -X -H -D params or we have an extended version
     * @param request
     */
    hasParams(request: string): boolean {
        return request.split(this.regexExpression).length != 1;
    }

    /**
     * cleaning request from escape's keywords
     * @param request
     */
    preFilterRequest(request: string): string {
        let normalizedRequest: string;
        if (!request.includes("^")) {
            //Bash
            normalizedRequest = request
                .trim()
                .replace(/[\r]/g, "")
                .replace(/[\n]/g, "")
                .replace(/[\\]/g, "")
                .replace(/[']/g, "");
        }else {
            //cmd
            normalizedRequest = request
                .trim()
                .replace(/[\r]/g, "")
                .replace(/[\n]/g, "")
                .replace(/[\\]/g, "")
                .replace(/[\^]/g, "")
                .replace(/["]/g, "");
        }

        return normalizedRequest;
    }

    handleParam(param: string, httpRequest:HttplyRequest): void {

        let url = "";
        let words = param.split(" ");
        switch (param.trim().split(" ")[0]) {
            case "X":
            case "-request": {
                httpRequest.options.method = words[1] as HttplyMethod;
                httpRequest.url = words[2];
                break;
            }
            case "-header":
            case "H": {
                const [headerKey,...headerValues] = param
                    .replace(words[0] + " ", "")
                    .split(":");
                let headerValue = headerValues.join(":")

                httpRequest.options.headers![headerKey] = headerValue.trim();
                break;
            }
            case "d":
            case "-data-raw":
            case "-data": {
                // has d flag and no X param so it's a POST
                httpRequest.options.method = "POST";
                let data = {};
                param = param
                    .replace(words[0]+" ","");


                if (httpRequest.options.headers!['Content-Type'] != "application/json"){
                    let aux = param.split("&");
                    if(aux.length!=1) {
                        aux.forEach((element) => {
                            let el = element.replace(/["|']/g, "").split("=");
                            data[el[0]] = el[1].trim();
                        });
                    }else{
                        data["data"] = param;
                    }
                } else {
                    //parse the JSON string
                    let aux = param.replace(words[0] + " ", "");
                    data = JSON.parse(aux);
                }
                httpRequest.body = JSON.stringify(data);
                break;
            }
            default: {
                if (param.includes("curl") && param.includes("http")) {
                    url = param.split(" ")[1];
                    httpRequest.url  = url;
                }
                if (!(httpRequest.body == undefined) && (httpRequest.body.includes('"-data-raw"}'))){
                    //the following param string overwrite body content
                    httpRequest.body = param;
                }
                break;
            }
        }
    }
}
