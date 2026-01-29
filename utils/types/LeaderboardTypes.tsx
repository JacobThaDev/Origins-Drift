import { ScoresTypes } from "./ScoresTypes";
import { TracksTypes } from "./TracksTypes";

export interface LeaderboardTypes {
    track: TracksTypes;
    leaderboard: ScoresTypes[];
    error?: string;
}