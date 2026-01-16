
/**
 * Get all games and tracks
 * @param req 
 * @returns 
 */

import { DiscordMemberTypes } from "@/utils/types/discord/DiscordMemberTypes";
import { DiscordRoleTypes } from "@/utils/types/discord/DiscordRoleTypes";
import { DiscordUserTypes } from "@/utils/types/discord/DiscordUserTypes";
import { revalidateTag, unstable_cache } from "next/cache";
import db from "@/models";
import { Op } from "sequelize";
import { AccountTypes } from "@/utils/types/AccountTypes";

const BOT_TOKEN   = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID    = process.env.DISCORD_GUILD_ID;
const LEADER_ROLE = process.env.DISCORD_LEADERS_GROUP_ID as string;
const MEMBER_ROLE = process.env.DISCORD_MEMBERS_GROUP_ID as string;

const getCachedUsers = () => unstable_cache(
    async () => {
        try {

            const [ guildMembers, guildRoles ] = await Promise.all([
                fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members?limit=1000`, {
                    headers: {
                        Authorization: `Bot ${BOT_TOKEN}`,
                    }
                }),
                fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/roles`, {
                    headers: {
                        Authorization: `Bot ${BOT_TOKEN}`,
                    }
                })
            ]);

            if (!guildMembers.ok || !guildRoles.ok) {
                return {
                    leaders: [],
                    members: [],
                    users: []
                }
            }

            const members:DiscordMemberTypes[]   = await guildMembers.json();
            const roles:DiscordRoleTypes[]       = await guildRoles.json();

            const leaders:DiscordUserTypes[]     = [];
            const membersList:DiscordUserTypes[] = [];
            const others:DiscordUserTypes[]      = [];
            
            const member_ids:string[] = members.map((m:DiscordMemberTypes) => m.user.id);

            const accounts = await db.account.findAll({
                attributes: ["accountId", "userId"],
                where: {
                    accountId: {
                        [Op.in]: member_ids
                    }
                },
                include: {
                    model: db.users,
                    as: "User",
                    attributes: ["name", "image", "role", "banned", "banExpires", "createdAt", ],
                    include: {
                        model: db.accountData,
                        as: "AccountData"
                    },
                },
                raw: true,
                nest: true
            })

            const accountMap = new Map(accounts.map((a:AccountTypes) => [a.accountId, a.User]));
            const roleMap    = new Map(roles.map(r => [r.id, r]));

            members.map((m:DiscordMemberTypes) => {
                const isBot:boolean = m.user.bot ?? false;

                if (isBot) {
                    return;
                }

                const avatarHash:string  = m.user.avatar;
                const member_id:string   = m.user.id;

                // Map roles using the O(1) Role Map
                const mappedRoles: DiscordRoleTypes[] = m.roles.flatMap(roleId => {
                    const role = roleMap.get(roleId);
                    return role ? [role] : [];
                });

                const dbData:AccountTypes = accountMap.get(member_id) as AccountTypes;

                const extension = avatarHash 
                    && avatarHash.startsWith("a_") ? "gif" : "png";
                
                const avatarUrl = avatarHash && avatarHash 
                    ? `https://cdn.discordapp.com/avatars/${member_id}/${avatarHash}.${extension}`
                    : `https://cdn.discordapp.com/embed/avatars/${(BigInt(member_id) >> 22n) % 6n}.png`;

                const userData:DiscordUserTypes = {
                    id: m.user.id,
                    username: m.user.username,
                    displayName: m.nick || m.user.global_name || m.user.username,
                    avatar_url: avatarUrl,
                    roles: mappedRoles,
                    account: dbData
                }

                if (m.roles.includes(LEADER_ROLE)) {
                    leaders.push(userData);
                } else if (m.roles.includes(MEMBER_ROLE)) {
                    membersList.push(userData);
                } else {
                    others.push(userData);
                }
            });
            
            return {
                leaders: leaders,
                members: membersList,
                users: others
            }
        } catch (err:any) {
            console.log(err);
            return {
                error: err.message
            }
        }
    },
    ['discord_users'], {
        tags: [
            'discord_users'
        ]
    }
)();

// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const guildMembers = await getCachedUsers();

        return Response.json(guildMembers);
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}