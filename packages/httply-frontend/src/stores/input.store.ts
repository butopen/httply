import {loggedWritable} from "../shared/store.util";
import {fetchParser} from "../shared/fetch-parser";
import type {HttplyInput} from "../shared/httply.model";
import {viewStore} from "./view.store";

export const inputStore = loggedWritable<HttplyInput>({
    httpInput: ""
})

export function updateHttpInput(httpInput: string) {
    const request = fetchParser(httpInput)
    viewStore.update(s => {
        s.request.general.data = {"Request URL": request.url, "Method": request.options.method}
        return s
    })
    inputStore.update({httpInput, request})
}
