import {loggedWritable} from "../shared/store.util";
import {fetchParser} from "../shared/fetch-parser";
import type {HttplyInput} from "../shared/httply.model";
import {viewStore} from "./view.store";

export const inputStore = loggedWritable<HttplyInput>({
    httpInput: ""
})

export function updateHttpDomain(domain: string) {
    viewStore.update(s => {
        s.request.general.data.Domain = domain
        return s
    })
}
export function updateHttpReferrer(referrer: string) {
    viewStore.update(s => {
        s.request.general.data.Referrer = referrer
        return s
    })
}

export function updateHttpInput(httpInput: string) {
    const request = fetchParser(httpInput)
    viewStore.update(s => {
        s.request.general.data = {"Request URL": request.url, "Method": request.options.method}
        return s
    })
    try{
        if(request.options.referrer){
            updateHttpDomain(request.options.referrer)
            updateHttpReferrer(request.options.referrer)
        }
    } catch (e){}
    inputStore.update({httpInput, request})
}
