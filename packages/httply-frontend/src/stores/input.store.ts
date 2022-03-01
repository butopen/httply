import {loggedWritable} from "../shared/store.util";
import {fetchParser} from "../shared/fetch-parser";
import type {HttplyInput} from "../shared/httply.model";
import {updateHttpRequest} from "./view.store";

export const inputStore = loggedWritable<HttplyInput>({
    httpInput: ""
})


export function updateHttpInput(httpInput: string) {
    const request = fetchParser(httpInput)
    updateHttpRequest("Url", request.url)
    try {
        if (request.options.referrer) {
            updateHttpRequest("Referrer", request.options.referrer)
            updateHttpRequest("Domain", request.options.referrer)
        }
    } catch (e) {
    }
    inputStore.update({httpInput, request})
}
