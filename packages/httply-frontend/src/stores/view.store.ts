import {loggedWritable} from "../shared/store.util";

export interface ViewState {
    request: {
        general: {
            open: boolean,
            data: { [key: string]: string }
        }
    },
    response?: {
        open: boolean,
        data: {
            headers: { [h: string]: string }
            body: any
        }
    }
}

export const viewStore = loggedWritable<ViewState>({
    request: {general: {open: true, data: {}}}
})

export function updateResponse(response: ViewState["response"]["data"]) {
    viewStore.update({response: {open: false, data: response}})
}

