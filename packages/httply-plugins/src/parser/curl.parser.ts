import type { HttplyRequest } from "@butopen/httply-model";
import { HttplyMethod } from "@butopen/httply-model";
import { HttplyParser, ParseError } from "./parser";


export class CurlParser implements HttplyParser {

  private regexExpression:RegExp = /[\s]+/;
  private curlParamDelimiter: `'` | `"`;
  private shellType: "bash" | "cmd";


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
      console.log(tokenizedRequest)
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
    return request.length > 2;
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
        // .replace(/[ \^]/g, "");
      this.curlParamDelimiter = '"';
    }

    // this prefiltering don't remove quotes
    return normalizedRequest;
  }


  /**
   * given a prefiltered curl request, splits it in substrings
   * @param request: normalizedRequest
   */
  tokenizeRequest(request:string):string[] {

    const wordsFromRequest = request.split(this.regexExpression); // split by at least one space
    let captureParam:boolean = false; //if true, current word will be concat with the previous
    let tokenizedRequest:string[] = [];

    wordsFromRequest.forEach((element,index)=>{
      if(!captureParam) {
        //allora faccio cose
        switch (element) {
          case "-X":
          case "--request": {
            tokenizedRequest.push(wordsFromRequest[index].trim().concat(" " + wordsFromRequest[index + 1].trim()));
            wordsFromRequest.splice(index+1, 1);
            break;
          }

          case "-H":
          case "-d":
          case "--data":
          case "--data-raw":
          case "--header": {
            captureParam = true;
            tokenizedRequest.push(element);
            break;
          }
          default: {
            if(!(element =="^"))
              tokenizedRequest.push(element);
            break;
          }
        }
      }else{
        //  concatenate with previous word
        tokenizedRequest[tokenizedRequest.length-1] = tokenizedRequest[tokenizedRequest.length-1].concat(" "+element);
        //  concateno e basta. Al massimo rimetto a false capture Param!

        if(element.startsWith(this.curlParamDelimiter) && !(element.startsWith(`\^\\^"`))){
          //remove first quote
          tokenizedRequest[tokenizedRequest.length-1] = tokenizedRequest[tokenizedRequest.length-1].replace(new RegExp(this.curlParamDelimiter),"");
        }

        if(element.endsWith(this.curlParamDelimiter) && !(element.endsWith(`\^\\^"`))) {
          captureParam = false;
            //remove end quote
            tokenizedRequest[tokenizedRequest.length-1] = tokenizedRequest[tokenizedRequest.length-1].substring(0,tokenizedRequest[tokenizedRequest.length-1].length-1);
        }
      }
    });

    return tokenizedRequest;
  }

  handleParam(param: string, httpRequest: HttplyRequest): void {
    let words = param.split(" ");

    switch (param.trim().split(" ")[0]) {
      case "-X":
      case "--request": {
        httpRequest.options.method = words[1] as HttplyMethod;
        httpRequest.url = words[2];
        break;
      }
      case "--header":
      case "-H": {

        const [headerKey, ...headerValues] = param
          .replace(words[0] + " ", "")
          .split(":");
        let headerValue = headerValues.join(":");

        if(this.shellType == "cmd"){
          headerValue = headerValue.replace(/\^\\\^/g,"");
        }

        httpRequest.options.headers![headerKey] = headerValue.trim();
        break;
      }
      case "-d":
      case "--data-raw":
      case "--data": {
        // has d flag and no X param so it's a POST
        httpRequest.options.method = "POST";
        let data = {};
        param = param.replace(words[0] + " ", "");

        if (httpRequest.options.headers!["Content-Type"] != "application/json") {

          if(this.shellType == "cmd"){
            param = param.replace(/\^\\\^/g,"");
          }

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
        if (param.startsWith(this.curlParamDelimiter + "http") || (param != "--compressed") ) {
          httpRequest.url = param.replace(/["|']/g,"");
        }
        break;
      }
    }
  }
}
