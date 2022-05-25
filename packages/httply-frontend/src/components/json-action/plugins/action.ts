export interface Action{
    name: string;
    tooltip: string;
    jsonCatched: {};


    onClick(json:{}):void;
}


