import { TracksTypes } from "./TracksTypes";

export interface GamesTypes {
    id: number;
    symbol: "FH4" | "FH5" | "FH6";
    name: string;
    tracks: TracksTypes[];
    error?: string;
}