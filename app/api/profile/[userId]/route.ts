import { UsersTypes } from "@/utils/types/UsersTypes";
import { DiscordMemberTypes } from "@/utils/types/discord/DiscordMemberTypes";
import { revalidateTag, unstable_cache } from "next/cache";
import { getAvatar } from "@/utils/Functions";
import db from "@/models";

const BOT_TOKEN   = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID    = process.env.DISCORD_GUILD_ID;

const getDiscordMember = (member_id:string) => unstable_cache(
    async () => {
        const result = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${member_id}`, {
            headers: {
                Authorization: `Bot ${BOT_TOKEN}`,
            }
        });

        if (!result.ok) {
            const errorText = await result.json();
            return {
                error: errorText
            }
        }

        const memberData:DiscordMemberTypes = await result.json();
        return memberData;
    },
    ['discord_user', member_id], {
        revalidate: 3600,  // 1 hours
        tags: [
            `discord_user_${member_id}`
        ]
    }
)();

/**
 * Get a user by user id
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const { userId }:RequestTypes = await res.params;

        const user:UsersTypes = await db.users.findOne({
            where: {
                id: userId
            },
            attributes: {
                exclude: ['email', 'email_verified']
            },
            include: [
                {
                    model: db.accountData,
                    as: "AccountData"
                },
                {
                    model: db.account,
                    as: "Account",
                    attributes: ["accountId", "providerId"]
                }
            ]
        });

        if (!user) {
            return Response.json({ 
                error: "Could not find profile"
            });
        }

        const member = await getDiscordMember(user.Account.accountId) as DiscordMemberTypes;

        if (!member || member.error) {
            return Response.json({ 
                error: "Could not load Discord profile"
            });
        }

        const newImageLink = getAvatar(member.user.id, member.user.avatar);

        if (user.image != newImageLink) {
            try {
                await user.update({
                    image: newImageLink
                })
                revalidateTag('leaders');
            } catch(err:any) {
                console.error("Failed to update user image: "+err.message);
            }
        }

        return Response.json({
            user: user,
            discord: member
        });
    } catch (e:any) {
        console.error(e.response);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    userId: string;
}