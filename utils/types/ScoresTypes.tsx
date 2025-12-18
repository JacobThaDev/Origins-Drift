import { GamesTypes } from "./GamesTypes";
import { TracksTypes } from "./TracksTypes";

export interface ScoresTypes {
    game: GamesTypes;
    track: TracksTypes;
    scores: {
        id: number;
        username: string;
        game: number;
        track: number;
        class: string;
        scores: number;
        proof_url: string;
        verified: boolean;
        createdAt: string;
        updatedAt: string;
    }[]
}