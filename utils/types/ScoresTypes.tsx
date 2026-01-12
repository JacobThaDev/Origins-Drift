import { GamesTypes } from "./GamesTypes";
import { LeadersTypes } from "./LeadersTypes";
import { TracksTypes } from "./TracksTypes";

export interface ScoresTypes {
    game: GamesTypes;
    track: TracksTypes;
    error?: string;
    scores: LeadersTypes[]
}