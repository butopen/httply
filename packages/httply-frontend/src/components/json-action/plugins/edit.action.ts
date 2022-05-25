import type {Action} from "./action";

export class EditAction implements Action{
    name: string;
    tooltip: string;
    jsonCatched: {};

    //ICON or name generico

    constructor() {
        this.name = "editJson";
        this.tooltip = "edit current Json section"
    }

    onClick(json:{}): void {
        // console.log("ciao da edit")
        // Dispatch new event, handled by devtool-request, for pop-up!
        let e = new Event("show-edit-popup");
        window.dispatchEvent(e);
    }
}
