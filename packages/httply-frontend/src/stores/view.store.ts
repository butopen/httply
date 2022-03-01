import {loggedWritable} from "../shared/store.util";

export interface ViewState {
    sectionExpanded: {
        General: boolean
        ResponseHeaders: boolean
        Response: boolean
        Payload: boolean
    }
    request: {
        information: {
            Url?:string
            Domain?:string
            Referrer?:string
        }
    }
    response?: {
        headers: { [h: string]: string }
        body: any
    }
}

const sections = {
    General:  true,
    ResponseHeaders:  false,
    Response:  false,
    Payload:  false
}
export const viewStore = loggedWritable<ViewState>({
    request: {information: {}}, sectionExpanded:sections
})

export function updateHttpRequest(key: keyof ViewState["request"]["information"], value:string) {
    viewStore.update(s => {
        const information = {...s.request.information, [key]: value}
        s.request = {...s.request, information}
        return s
    })
}

export function updateSection(key: keyof ViewState["sectionExpanded"], open: boolean) {
    viewStore.update(s => {
        s.sectionExpanded[key] = open
        return s
    })
}

export function updateResponse(response: ViewState["response"]) {
    viewStore.update({response: response})
    updateSection("Response", true)
}

