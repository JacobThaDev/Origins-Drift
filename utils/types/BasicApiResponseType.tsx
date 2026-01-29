export interface BasicApiResponseType {
    message?:string;
    error?: string;
    success?: boolean;
    new_pb?: boolean;
    result?: any;
}