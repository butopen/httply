export interface HLRequestInformation {
    url: string;
    options: RequestInit;
}

export interface HLRequest extends Request {
    content: HLRequestInformation;
}

export interface HLResponseInformation {
    request: HLRequestInformation;
    time: number;
    status: number;
    headers: { [h: string]: string };
}
