import { GamesTypes } from "./GamesTypes";
import { ScoresTypes } from "./ScoresTypes";

export interface TracksTypes {
    id: number;
    name: string;
    short_name: string;
    game: number;
    Game: GamesTypes;
    Scores: ScoresTypes[];
    length: number;
    favorite: boolean;
    track_image: string;
    error?: string;
    webhook_url: string|null;
    top_score: number|null;
    user_count: number|null;
    entries: number|null,
}