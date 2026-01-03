import { TracksTypes } from "./TracksTypes";

export interface GamesTypes {
    id: number;
    symbol: string;
    name: string;
    tracks: TracksTypes[];
    error?: string;
}