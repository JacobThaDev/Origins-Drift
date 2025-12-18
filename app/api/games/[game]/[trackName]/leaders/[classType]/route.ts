import db from '@/models/index';
import { Op, Sequelize } from 'sequelize';

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

        if (classType != "a" && classType != "s1") {
             return Response.json({
                error: "Invalid class type. Allowed: A or S1"
            });
        }
        
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
                id: {
                    [Op.in]: Sequelize.literal(`(
                        SELECT id FROM scores s3 
                            WHERE s3.score = (SELECT MAX(score) 
                                FROM scores s4 
                                WHERE s4.user_id = s3.user_id AND s4.class = '${classType}' AND s4.track = ${track.id})
                    )`)
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

        return Response.json({
            game: game,
            track: track,
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