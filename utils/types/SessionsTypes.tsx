import { DiscordMemberTypes } from "./discord/DiscordMemberTypes";
import { UsersTypes } from "./UsersTypes"

export interface SessionsTypes {
    session: {
        id: string;
        userId: string;
        token: string;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
        ipAddress: string | null;
        userAgent: string | null;
    },
    user: UsersTypes;
    discord:DiscordMemberTypes;
}
