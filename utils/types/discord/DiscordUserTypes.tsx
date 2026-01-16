import { UsersTypes } from "../UsersTypes";
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
    joined: string;
    roles: DiscordUserRoleTypes[],
    account?:UsersTypes;
}