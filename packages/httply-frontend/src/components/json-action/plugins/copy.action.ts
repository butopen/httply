import type {Action} from "./action";
import {copyToClipboard} from "../../../shared/clipboard.util";
import {updateNotification} from "../../notification/notification.store";

export class CopyAction implements Action{
    name: string;
    tooltip: string;
    jsonCatched: {};



    constructor() {
        this.name = "copyJson";
        this.tooltip = "copy current Json section"
    }

    onClick(json:{}): void {
        this.jsonCatched = json;
        copyToClipboard(JSON.stringify(this.jsonCatched));
        updateNotification("json copied to clipboard!");
    }

}

