import {HLRequestInformation} from "../httply-backend.model";

export async function makeRequest(r:HLRequestInformation){
    const supportedOptions = {
        method: r.options.method,
        body: r.options.body,
        headers: r.options.headers
    }
    const result =  await fetch(r.url, supportedOptions)
    return result
}
