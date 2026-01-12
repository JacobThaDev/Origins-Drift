import db from '@/models/index';
import { unstable_cache } from 'next/cache';
import { Op } from 'sequelize';


const getCachedScores = (gameId: number, trackId: number, classType: string) => unstable_cache(
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
            limit: [10],
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
    ['recent', String(trackId), classType.toUpperCase()], {
        tags: [
            'recent',
            `recent-${trackId}`,
            `recent-${trackId}-${classType.toUpperCase()}`
        ]
    }
)();

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const bodyData  = await res.params;
        const gameType  = bodyData?.game.toLowerCase().replace("_", " ");
        const trackName = bodyData?.trackName.toLowerCase().replace("_", " ");
        const classType = bodyData?.classType.toLowerCase().replace("_", " ");

        const game = await db.games.findOne({
            where: {
                symbol: gameType
            }
        });

        if (!game) {
            return Response.json({
                error: "Game not found."
            });
        }

        const track = await db.tracks.findOne({
            where: {
                short_name: trackName
            }
        });

        if (!track) {
            return Response.json({
                error: "Track not found in "+game.name+"."
            });
        }

        const scores = await getCachedScores(game.id, track.id, classType);

        if (!scores) {
            return Response.json({
                error: "no recent scores found"
            });
        }

        return Response.json(scores);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            success: false,
            message: e.message
        });
    }
}