import type { HttplyRequest } from "@butopen/httply-model";
import { HttplyParser, ParseError } from "./parser";


export class CurlParser implements HttplyParser {

    private regexExpression:RegExp = /[\s|']-/ ;


    parse(request:string):HttplyRequest{
        // la prima riga è sempre curl qualcosa
        // la seconda devo controllare se c'è -X per leggere il tipo di richiesta http
        // tutto il resto sono campi key value dell'header
        // c'è da tener conto che devo ottenere i parametri anche se passo una richiesta con i parametri passati dopo il ?
        let parsedRequest = {};
        if (this.canApply(request)) {
            parsedRequest['timestamp'] = new Date().getTime();  //da aggiungere sempre
            parsedRequest['method'] = 'GET'
            if(this.hasParams(request)){
                this.preFilterRequest(request);
                let params = request.split(this.regexExpression);
                console.log(params);
                params.forEach((element)=>{
                    this.handleParam(parsedRequest,element)
                });
            }else{
                parsedRequest['URL'] = request.split(" ")[1];
            }
        } else {
            throw new ParseError();
        }
        return parsedRequest;
    }


    canApply(request:string):boolean {
        // controllo semplicemente se contiene la keyword "curl", ripulisco da eventuali spazi all'inizio e alla fine
        return request.trim().startsWith("curl");
    }


    hasParams(request:string):boolean{
        //controllo se il comando copiato ha qualche parametro definito -Z -X -H -D (oppure nella versione estesa)
        // altrimenti vuol dire che sta facendo una get con eventuali dati passati nel body
        return request.split(this.regexExpression).length != 1;
    }

    preFilterRequest(request:string):void{
        if(!request.includes('^'))
            //curl Bash
            request = request.trim().replace(/[\r]/g,"").replace(/[\n]/g,"").replace(/[\\]/g,"").replace(/[']/g,"");
        else{
            //curl cmd
            // devo sostituire i doppi apici con i singoli apici
            request = request.trim().replace(/[\r]/g,"").replace(/[\n]/g,"").replace(/[\\]/g,"").replace(/[\^]/g,"").replace(/["]/g,"");
        }
    }

    handleParam(json:{}, param:string):void{
        let words = param.split(" ");
        switch (param.trim().split(" ")[0]){
            case 'X':
            case '-request':{
                json['method'] = words[1];
                json['URL'] = words[2];
                break;
            }
            case '-header':
            case 'H':{
                let aux = param.replace(words[0]+" ",'').replace(":","§").split('§');
                json[aux[0]] = aux[1].trim()
                break;
            }
            case 'd':
            case '-data':
            case '-data-raw':{
                // se c'è il campo d nella richiesta curl e non c'è specificata l'opzione X
                // allora sicuramente è una POST
                json['method'] = 'POST';

                let data = {}
                if(json['Content-Type'] != 'application/json') {
                    // elementi chiave valore
                    let aux = param.replace(words[0] + " ", "").split("&");
                    aux.forEach((element) => {
                        let el = element.replace(/["|']/g, "").split("=");
                        data[el[0]] = el[1].trim();
                    })
                }else{
                    //parse diretto della stringa in json
                    let aux = param.replace(words[0] + " ", "");
                    data = JSON.parse(aux);
                }
                json['data'] = data;
                break;
            }
            default: {
                // questo perchè per come funziona il parser, se nella stessa stringa c'è sia curl che url, vuol dire che non
                // era presente il parametro -X!
                if(param.includes("curl") && param.includes("http")){
                    json['URL'] = param.split(" ")[1];
                }
                break;
            }
        }
    }
    
}