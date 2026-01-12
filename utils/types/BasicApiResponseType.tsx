import { ScoresTypes } from "./ScoresTypes";

export interface BasicApiResponseType {
    message?:string;
    error?: string;
    success?: boolean;
    result?: any;
}