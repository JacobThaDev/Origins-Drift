import { AccountTypes } from "./AccountTypes";
import { DiscordMemberTypes } from "./discord/DiscordMemberTypes";
import { ScoresTypes } from "./ScoresTypes";
import { TracksTypes } from "./TracksTypes";

export interface ProfileTypes {
    account: AccountTypes,
    discord: DiscordMemberTypes,
    records: ProfileRecordsTypes[];
    error?: { 
        message: string, 
        code: number 
    };
}

export interface ProfileRecordsTypes {
    class: string;
    max_score: number;
    Track: TracksTypes;
}