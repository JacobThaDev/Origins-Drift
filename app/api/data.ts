import db from "@/models";
import { unstable_cache } from "next/cache";
import { Op, Sequelize } from "sequelize";
import crypto from "node:crypto";
import { DiscordMemberTypes } from "@/utils/types/discord/DiscordMemberTypes";

const BOT_TOKEN   = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID    = process.env.DISCORD_GUILD_ID;

/**
 * get a tracks data including the game it belongs to
 * @param gameSymbol the game as either `fh4`, `fh5`, or `fh6`
 * @param trackName the short name of the track.
 * @returns 
 */
export const getCachedTrack = (gameSymbol:string, trackName:string) => unstable_cache(
    async () => {
        const track = await db.tracks.findOne({
            where: {
                short_name: trackName
            },
            include: {
                model: db.games,
                as: "Game",
                where: { symbol: gameSymbol }
            }
        });
        
        return track;
    },
    ['tracks', gameSymbol, trackName.toLowerCase()], {
        tags: [
            'tracks',
            `track-${gameSymbol.toUpperCase()}`,
            `track-${gameSymbol.toUpperCase()}-${trackName.toLowerCase()}`,
        ]
    }
)();

export const getTrackData = (classType:string = 'a') => unstable_cache(
    async () => {
        const trackData = await db.tracks.findAll({
            attributes: {
                exclude: ['webhook_url'],
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(DISTINCT user_id)
                            FROM scores AS s
                            WHERE s.track = tracks.id
                                AND s.class = '${classType}'
                        )`), 'user_count'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(DISTINCT id)
                            FROM scores AS s
                            WHERE s.track = tracks.id
                                AND s.class = '${classType}'
                        )`), 'entries'
                    ]
                ]
            },
            include: [
                {
                    model: db.games,
                    as: "Game"
                }, 
                {
                    model: db.scores,
                    as: "Scores",
                    where: { class: classType },
                    attributes: {
                        exclude: ['proof_url', 'updatedAt', 'track', 'game', 'proof_delete_hash']
                    },
                    required: false,
                    separate: true,  // This runs a separate query, making the order below work
                    order: [["score", "DESC"]],
                    limit: 1,
                    include: {
                        model: db.users,
                        as: "User",
                        attributes: {
                            exclude: ['email', 'emailVerified', 'updatedAt','twoFactorEnabled', 'banReason', 'banExpires']
                        }
                    }
                }
            ],
        });
        
        return trackData;
    },
    ['tracks-data', classType], {
        tags: [
            'tracks-data',
            `tracks-data-${classType}`
        ]
    }
)();

/**
 * 
 * @param user_id the user id
 * @param trackId the track id
 * @param classType the PI class as either `a` or `s1` 
 * @returns 
 */
export const getUserRecord = (user_id:string, trackId: number, classType: string) => unstable_cache(
    async () => {
        return await db.scores.findOne({
            attributes: [
                [Sequelize.fn('MAX', Sequelize.col('score')), 'score'] // Use an alias for the result
            ],
            where: {
                user_id: user_id,
                track: trackId,
                class: classType
            },
            raw: true
        });
    },
    ['user-record', String(trackId), classType.toUpperCase(), user_id], {
        tags: [
            'user-records',
            `user-record-${trackId}-${classType.toUpperCase()}-${user_id}`
        ]
    }
)();


/**
 * Gets a list of scores for a provided track and class, 
 * caching the result until it's revalidated manually.
 * @param trackId the track id
 * @param classType car class (`a` or `s1`)
 * @returns 
 */
export const getCachedScores = (trackId: number, classType: string) => unstable_cache(
    async () => {
        return await db.scores.findAll({
            attributes: ["class", "score", "verified", "proof_url", "createdAt"],
            where: {
                id: {
                    [Op.in]: Sequelize.literal(`(
                        SELECT MAX(id) FROM scores AS s1
                        WHERE s1.track = ${trackId} AND s1.class = '${classType}'
                        AND s1.score = (
                            SELECT MAX(score) FROM scores AS s2 
                            WHERE s2.user_id = s1.user_id AND s2.track = ${trackId} AND s2.class = '${classType}'
                        ) GROUP BY user_id
                    )`)
                }
            },
            order: [["score", "DESC"]],
            limit: 50,
            include: [{
                model: db.users,
                as: "User",
                attributes: ["name", "discord_name", "image", "createdAt"],
                include: [
                    { 
                        model: db.accountData, 
                        as: "AccountData",
                        attributes: ["platform", "platform_name"] 
                    },
                    { 
                        model: db.account, 
                        as: "Account", 
                        attributes: ["accountId", "providerId"] 
                    }
                ]
            }]
        });
    },
    ['leaderboards', String(trackId), classType.toUpperCase()], {
        tags: [
            'leaders',
            `leaders-${trackId}`,
            `leaders-${trackId}-${classType.toUpperCase()}`
        ]
    }
)();

export const getCachedRecentScores = (gameId: number, trackId: number, classType: string) => unstable_cache(
    async () => {
        return await db.scores.findAll({
            where: {
                [Op.and]: {
                    game: gameId,
                    track: trackId,
                    class: classType
                }
            },
            order: [
                ["id", "DESC"]
            ],
            limit: [7],
            include: [{
                model: db.users,
                as: "User",
                attributes: ["name", "discord_name", "image", "createdAt"],
                include: [
                    { 
                        model: db.accountData, 
                        as: "AccountData",
                        attributes: ["platform", "platform_name"] 
                    },
                    { 
                        model: db.account, 
                        as: "Account", 
                        attributes: ["accountId", "providerId"] 
                    }
                ]
            }]
        });
    },
    ['recent', String(trackId), classType.toUpperCase()], {
        tags: [
            'recent',
            `recent-${trackId}`,
            `recent-${trackId}-${classType.toUpperCase()}`
        ]
    }
)();

export const getUserByName = (name:string, includeId:boolean = false) => unstable_cache(
    async () => {
        const user = await db.users.findOne({
            attributes: includeId 
                ? [ "id", "name", "discord_name", "image", "role", "createdAt" ] 
                : [ "name", "discord_name", "image", "role", "createdAt" ],
            where: {
                discord_name: name
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

        return user;
    },
    ['user-name', name], {
        revalidate: 3600,  // 1 hours
        tags: [
            `user-names`,
            `user-name-${name}`
        ]
    }
)();

export const getUserByNameWithId = (name:string) => unstable_cache(
    async () => {
        const user = await db.users.findOne({
            attributes: [ "id", "name", "discord_name", "image", "role", "createdAt" ],
            where: {
                discord_name: name
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

        return user;
    },
    ['user-name-id', name], {
        revalidate: 3600,  // 1 hours
        tags: [
            `user-name-id-${name}`
        ]
    }
)();

export const getCachedUser = (user_id:string) => unstable_cache(
    async () => {
        return await db.users.findOne({
            attributes: [
                "name", "image", "role", "createdAt"
            ],
            where: {
                id: user_id
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
            ]
        });
    },
    ['users', user_id], {
        tags: [
            'users',
            `users-${user_id}`,
        ]
    }
)();

export const getDiscordMember = (member_id:string) => unstable_cache(
    async () => {
        const result = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${member_id}`, {
            headers: {
                Authorization: `Bot ${BOT_TOKEN}`,
            }
        });

        if (!result.ok) {
            return null;
        }

        const memberData:DiscordMemberTypes = await result.json();
        return memberData;
    },
    ['discord_user', member_id], {
        revalidate: 3600,  // 1 hours
        tags: [
            `discord-user`,
            `discord_user-${member_id}`
        ]
    }
)();

export function verifySignature(payload: string, signature: string, secret: string) {
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("base64");
    
    return expectedSignature === signature;
}

export async function createSignature(payload: string, secret: string) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw", encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false, ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
}