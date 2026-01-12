import db from '@/models/index';
import { GamesTypes } from '@/utils/types/GamesTypes';
import { TracksTypes } from '@/utils/types/TracksTypes';
import { unstable_cache } from 'next/cache';
import { Op, Sequelize } from 'sequelize';
import { getCachedTrack } from '../../route';

/**
 * Gets a list of scores for a provided track and class, 
 * caching the result until it's revalidated manually.
 * @param trackId the track id
 * @param classType car class (`a` or `s1`)
 * @returns 
 */
const getCachedScores = (trackId: number, classType: string) => unstable_cache(
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

/**
 * Get all scores for a given game, track, and class
 * @param req 
 * @param res 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const bodyData  = await res.params;
        const gameType  = bodyData?.game.toLowerCase().replace("_", " ");
        const trackName = bodyData?.trackName.toLowerCase().replace("_", " ");
        const classType = bodyData?.classType.toLowerCase().replace("_", " ");
        
        if (classType != "a" && classType != "s1") {
             return Response.json({
                error: "Invalid class type. Allowed: 'a' or 's1'"
            });
        }
        
        const game:GamesTypes = await db.games.findOne({
            where: {
                symbol: gameType
            },
            include: {
                model: db.tracks,
                as: "tracks"
            }
        });

        if (!game) {
            return Response.json({
                error: "Game not found."
            });
        }

        const trackData:TracksTypes = await getCachedTrack(game.symbol, trackName);

        if (!trackData || trackData.error) {
            return Response.json({
                error: trackData ? trackData.error : "Track not found."
            });
        }

        const scores = await getCachedScores(trackData.id, classType.toUpperCase());

        return Response.json({
            track: trackData,
            scores: scores
        });
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            success: false,
            message: e.message
        });
    }
}