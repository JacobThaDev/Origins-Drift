import { AccountDataTypes } from "./AccountDataTypes";
import { AccountTypes } from "./AccountTypes";
import { DiscordMemberTypes } from "./discord/DiscordMemberTypes";

export interface UsersTypes {
    [x: string]: any;
    id: string;
    name: string;
    discord_name: string;
    emai?:string;
    emailVerified?: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    twoFactorEnabled: boolean;
    role: string;
    banned: boolean;
    banReason: string;
    banExpires: string;
    AccountData: AccountDataTypes;
    Account: AccountTypes;
    discord: DiscordMemberTypes;
    error?:string;
    update: (...args:any[]) => Promise<any>
}