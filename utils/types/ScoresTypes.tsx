import { GamesTypes } from "./GamesTypes";
import { LeadersTypes } from "./LeadersTypes";
import { TracksTypes } from "./TracksTypes";
import { UsersTypes } from "./UsersTypes";

export interface ScoresTypes {
    game: GamesTypes;
    track: TracksTypes;
    error?: string;
    scores: LeadersTypes[]
}