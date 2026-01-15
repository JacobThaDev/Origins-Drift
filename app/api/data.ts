import db from "@/models";
import { unstable_cache } from "next/cache";
import { Op, Sequelize } from "sequelize";

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
    ['tracks', String(gameSymbol), trackName.toLowerCase()], {
        tags: [
            'tracks',
            `tracks-${gameSymbol}`,
            `tracks-${gameSymbol}-${trackName}`,
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
                [Sequelize.fn('MAX', Sequelize.col('score')), 'max_score'] // Use an alias for the result
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
                attributes: ["name", "image", "createdAt"],
                include: [
                    { 
                        model: db.accountData, 
                        as: "AccountData",
                        attributes: ["display_name", "platform"] 
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