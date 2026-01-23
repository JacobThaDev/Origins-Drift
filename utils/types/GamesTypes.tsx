import { TracksTypes } from "./TracksTypes";

export interface GamesTypes {
    id: number;
    symbol: GamesSymbol;
    name: string;
    tracks: TracksTypes[];
    error?: string;
}

export type GamesSymbol = "FH4" | "FH5" | "FH6";