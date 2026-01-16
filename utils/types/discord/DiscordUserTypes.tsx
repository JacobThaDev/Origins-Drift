import { AccountTypes } from "../AccountTypes";
import { DiscordUserRoleTypes } from "./DiscordUserRoleTypes";

/**
 * a shorthand version of DiscordUserTypes for the api
 */
export interface DiscordUserTypes {
    id: string,
    username: string,
    displayName: string,
    avatar?: string,
    avatar_url: string,
    roles: DiscordUserRoleTypes[],
    account?:AccountTypes;
}