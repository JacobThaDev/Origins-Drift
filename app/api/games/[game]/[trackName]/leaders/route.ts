import db from '@/models/index';
import { Op } from 'sequelize';

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

        const scores = await db.scores.findAll({
            attributes: [
                "username", "class", "score", "verified", "proof_url", "createdAt"
            ],
            where: {
                [Op.and]: {
                    game: game.id,
                    track: track.id
                }
            },
            order: [
                ["score", "DESC"]
            ],
            limit: [ 0, 100 ],
            include: [
                {
                    model: db.users,
                    as: "User",
                    attributes: [
                        "name", "image", "createdAt"
                    ],
                    include: {
                        model: db.account,
                        as: "AccountData",
                        attributes: [
                            "display_name", "platform"
                        ]
                    }
                    
                }
            ]
        });

        if (!scores) {
            return Response.json({
                error: "No records found in "+game.name+" on  "+track.name+"."
            });
        }

        return Response.json({
            game: game,
            track: track,
            scores: scores
        });
    } catch (e:any) {

        return Response.json({
            success: false,
            message: e.message
        });
    }
}