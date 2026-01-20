import db from "@/models";
import { AccountTypes } from "@/utils/types/AccountTypes";
import { DiscordMemberTypes } from "@/utils/types/discord/DiscordMemberTypes";
import { revalidateTag } from "next/cache";
import { unstable_cache } from "next/cache";
import { Sequelize } from "sequelize";


const BOT_TOKEN   = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID    = process.env.DISCORD_GUILD_ID;

const getDiscordUser = (member_id:string) => unstable_cache(
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

        const account:AccountTypes = await db.account.findOne({
            attributes: ["accountId", "providerId"],
            where: {
                accountId: memberData.user.id
            },
            include: {
                model: db.users,
                as: "User",
                attributes: ["id", "name", "image", "role", "banned", "banReason", "createdAt", "updatedAt"],
                include: {
                    model: db.accountData,
                    as: "AccountData",
                    include: {
                        model: db.cars_fh5,
                        as: "fav_car"
                    }
                }
            }
        });

        let records = [];

        if (account && account.User) {
            records = await getUserAllTrackRecords(account.User.id);
        }

        return {
            account: account,
            discord: memberData,
            records: records
        };
    },
    ['discord_user', member_id], {
        revalidate: 10800,  // 3 hours
        tags: [
            `discord_user_${member_id}`
        ]
    }
)();

/**
 * Gets the personal best score for a user across ALL tracks for a specific class.
 * * @param user_id the user id
 * @param classType the PI class as either `a` or `s1` 
 */
const getUserAllTrackRecords = (user_id: string) => unstable_cache(
    async () => {
        return await db.scores.findAll({
            attributes: [
                //'track', // Include the track ID so you know which score belongs where
                'class',
                [Sequelize.fn('MAX', Sequelize.col('score')), 'max_score'],
            ],
            where: {
                user_id: user_id,
            },
            include: {
                model: db.tracks,
                as: "Track",
                attributes: ["id", "name", "short_name", "length", "game", "favorite", "track_image"]
            },
            group: ['Track.id', 'scores.class'],
            order: [['class', 'ASC']],
            raw: true,
            nest: true
        });
    },
    ['user-records', user_id], {
        revalidate: 10800, // 3 hours
        tags: [
            'user-records',
            `user-records-${user_id}`
        ]
    }
)();

/**
 * Get a discord member by user id and their associated platform account
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const { memberId }:RequestTypes = await res.params;

        const result = await getDiscordUser(memberId);

        return Response.json(result);
    } catch (e:any) {
        console.error(e.response);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    memberId: string;
}