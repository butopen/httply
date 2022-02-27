import {loggedWritable} from "../shared/store.util";

export interface ViewState {
    request: {
        general: {
            open: true,
            data: { [key: string]: string }
        }
    }
}

export const viewStore = loggedWritable<ViewState>({
    request: {general: {open: true, data: {}}}
})

