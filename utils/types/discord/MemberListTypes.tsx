import { DiscordUserTypes } from "./DiscordUserTypes";

export interface MemberListTypes {
    leaders: DiscordUserTypes[];
    coleaders: DiscordUserTypes[];
    members: DiscordUserTypes[];
    users: DiscordUserTypes[];
    error?: string;
}