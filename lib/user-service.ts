// 1. Create a shared data fetching function

import { getDiscordMember } from "@/app/api/data";
import db from "@/models";
import { UsersTypes } from "@/utils/types/UsersTypes";

// Put this in a file like @/lib/user-service.ts
export async function getFullUserProfile(userId: string) {
    
    const user:UsersTypes = await await db.users.findOne({
        attributes: [
            "name", "discord_name", "image", "role", "createdAt"
        ],
        where: {
            id: userId
        },
        include: [
            {
                model: db.accountData,
                as: "AccountData",
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
    
    // Call your Discord fetch logic here directly
    const discordMember = await getDiscordMember(user.Account.accountId);
    
    return { 
        user: user, 
        discord: discordMember 
    };
}