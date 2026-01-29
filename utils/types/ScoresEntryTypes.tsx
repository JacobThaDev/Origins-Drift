import { ScoresTypes } from "./ScoresTypes";

export interface ScoresEntryTypes {
    success: boolean;
    message: string;
    score: number;
    previous_best: number;
    new_pb: boolean;
    result: ScoresTypes;
    error?: string;
}