// 1. Create a shared data fetching function

import db from "@/models";
import { DiscordMemberTypes } from "@/utils/types/discord/DiscordMemberTypes";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { revalidateTag } from "next/cache";

const BOT_TOKEN   = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID    = process.env.DISCORD_GUILD_ID;

// Put this in a file like @/lib/user-service.ts
export async function getFullUserProfile(userId: string) {
    
    const user:UsersTypes = await await db.users.findOne({
        attributes: [
            "name", "discord_name", "image", "role", "createdAt", "banned"
        ],
        where: {
            id: userId
        },
        include: [
            {
                model: db.accountData,
                as: "AccountData",
                require: false,
                attributes: {
                    exclude: ['user_id']
                }
            },
            {
                model: db.account,
                as: "Account",
                attributes: ["accountId", "providerId"]
            }
        ],
        raw: true,
        nest: true
    });
            
    if (!user) 
        return null;
    
    const memberData = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${user.Account.accountId}`, {
        headers: {
            Authorization: `Bot ${BOT_TOKEN}`,
        }
    });

    if (!memberData.ok) {
        return null;
    }

    const member:DiscordMemberTypes = await memberData.json();

    if (member) {
        // server nickname first, then global display name
        const display_name = member.nick || member.user.global_name;

        if (user.discord_name != member.user.username || user.name != display_name) {
            try {
                await db.users.update({
                    name: display_name,
                    discord_name: member.user.username
                }, { 
                    where: { id: userId }
                });

                // need to refresh the caches for everything related to said user.
                revalidateTag(`users-${userId}`, 'max');
                revalidateTag(`user-name-id-${user.discord_name}`, 'max');
                revalidateTag(`user-name-${user.discord_name}`, 'max');
                revalidateTag(`leaders`, 'max');
                revalidateTag(`user-records`, 'max');
                revalidateTag(`tracks-data`, 'max');
            } catch (err:any) {
                console.error(err);
            }
        }
    }
    
    return { 
        user: user, 
        discord: member 
    };
}