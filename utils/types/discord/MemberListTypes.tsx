import { DiscordUserTypes } from "./DiscordUserTypes";

export interface MemberListTypes {
    leaders: DiscordUserTypes[];
    members: DiscordUserTypes[];
    users: DiscordUserTypes[];
}