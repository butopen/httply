import type { HttplyRequest } from "@butopen/httply-model";
import { HttplyParser, ParseError } from "./parser";
import { HttplyMethod } from "@butopen/httply-model";
import * as http from "http";

export class CurlParser implements HttplyParser {

  private regexExpression:RegExp = /[\s]+/;
  private curlParamDelimiter: "'" | '"';
  private shellType: "bash" | "cmd";
  constructor() {}

  parse(request: string): HttplyRequest {
    if (this.canApply(request)) {
      // create HttplyRequest object response
      let parsedRequest = {
        options: { headers: {}, method: "GET" } as HttplyRequest["options"],
        url: "",
      } as HttplyRequest;

      const normalizedRequest = this.preFilterRequest(request);
      console.log(normalizedRequest);

      const tokenizedRequest = this.tokenizeRequest(normalizedRequest);
      console.log(tokenizedRequest);

      if (this.hasParams(tokenizedRequest)) {

        tokenizedRequest.forEach((element)=>{
          this.handleParam(element,parsedRequest);
        })

      } else {
        parsedRequest.url = normalizedRequest.split(this.regexExpression)[1] || "";
      }
      parsedRequest.timestamp = new Date().getTime();
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
  hasParams(request: string[]): boolean {
    return request.length != 1;
  }


  /**
   * cleaning request from escape's keywords
   * @param request
   */
  preFilterRequest(request: string): string {
    let normalizedRequest: string;
    if (!request.includes("^\\^")) {
      //Bash
      this.shellType = "bash";
      normalizedRequest = request
        .trim()
        .replace(/[\r]/g, "")
        .replace(/[\n]/g, "")
        .replace(/[\\]/g, "");
      this.curlParamDelimiter = "'";

    } else {
      //cmd
      this.shellType = "cmd";
      normalizedRequest = request
        .trim()
        .replace(/[\r]/g, "")
        .replace(/[\n]/g, "")
        // .replace(/[\\]/g, "")
        // .replace(/[\^]/g, "");
      this.curlParamDelimiter = '"';
    }
    return normalizedRequest;
  }


  /**
   * given a prefiltered curl request, splits it in substrings
   * @param request: normalizedRequest
   */
  tokenizeRequest(request:string):string[] {
     const wordsFromRequest = request.split(this.regexExpression);
     let captureCurlParam:boolean = false;

     for(let index=0; index<wordsFromRequest.length;index++){
       switch (wordsFromRequest[index]){

         case "-X":
         case "--request":
           wordsFromRequest[index] = wordsFromRequest[index].concat(" "+wordsFromRequest[index+1]);
           wordsFromRequest.splice(index+1,1);
           break;

         case "-H":
         case "--header":
           captureCurlParam = true;
           if(index != wordsFromRequest.length-1){
             wordsFromRequest[index+1] = wordsFromRequest[index+1].replace(this.curlParamDelimiter,"");
             wordsFromRequest[index] = wordsFromRequest[index].concat(" "+wordsFromRequest[index+1]);
             wordsFromRequest.splice(index+1,1);
           }else{
             //malformed curl, expected argument after -H or --header, throw error
             throw new ParseError();
           }
           break;

         default:
           if(captureCurlParam)
           {
             if(this.shellType == "cmd"){
               if((wordsFromRequest[index].endsWith(this.curlParamDelimiter)) && !(wordsFromRequest[index].endsWith('^"'))){
                 wordsFromRequest[index] = wordsFromRequest[index].replace(this.curlParamDelimiter, "");
                 captureCurlParam = false;
               }
             }else{
               if(wordsFromRequest[index].endsWith(this.curlParamDelimiter)){
                 wordsFromRequest[index] = wordsFromRequest[index].replace(this.curlParamDelimiter,"");
                 captureCurlParam = false;
               }
             }
             wordsFromRequest[index - 1] = wordsFromRequest[index-1].concat(" "+wordsFromRequest[index]);
             wordsFromRequest.splice(index,1);
             captureCurlParam = true;
           }
           break;
       }
     }

    return wordsFromRequest;
  }

  handleParam(param: string, httpRequest: HttplyRequest): void {
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
        const [headerKey, ...headerValues] = param
          .replace(words[0] + " ", "")
          .split(":");
        let headerValue = headerValues.join(":");

        httpRequest.options.headers![headerKey] = headerValue.trim();
        break;
      }
      case "d":
      case "-data-raw":
      case "-data": {
        // has d flag and no X param so it's a POST
        httpRequest.options.method = "POST";
        let data = {};
        param = param.replace(words[0] + " ", "");

        if (
          httpRequest.options.headers!["Content-Type"] != "application/json"
        ) {
          let aux = param.split("&");
          if (aux.length != 1) {
            aux.forEach((element) => {
              let el = element.replace(/["|']/g, "").split("=");
              data[el[0]] = el[1].trim();
            });
          } else {
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
          httpRequest.url = url;
        }
        if (
          !(httpRequest.body == undefined) &&
          httpRequest.body.includes('"-data-raw"}')
        ) {
          //the following param string overwrite body content
          httpRequest.body = param;
        }
        break;
      }
    }
  }
}
