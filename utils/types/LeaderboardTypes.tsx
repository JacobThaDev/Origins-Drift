import { LeadersTypes } from "./LeadersTypes";
import { TracksTypes } from "./TracksTypes";

export interface LeaderboardTypes {
    track: TracksTypes;
    leaderboard: LeadersTypes[];
    error?: string;
}