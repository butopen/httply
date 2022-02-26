import {loggedWritable} from "../shared/store.util";
import {fetchParser} from "../shared/fetch-parser";
import type {HttplyInput} from "../shared/httply.model";

export const inputStore = loggedWritable<HttplyInput>({
    httpInput: ""
})

export function updateHttpInput(httpInput: string) {
    const request = fetchParser(httpInput)
    inputStore.update({httpInput, request})
}
