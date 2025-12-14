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
        const bodyData = await res.params;
        const gameType = bodyData?.game.toLowerCase().replace("_", " ");

        const game = await db.games.findOne({
            where: {
                symbol: gameType
            },
            include: {
                model: db.tracks
            }
        });

        if (!game) {
            return Response.json({
                error: "There was an error in your query: Game does not exist."
            });
        }

        const favs = await db.tracks.findAll({
            where: {
                [Op.and]: {
                    game: game.id,
                    favorite: true
                }
            },
            include: {
                model: db.games,
                as: "Game"
            }
        });

        return Response.json(favs);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            success: false,
            message: e.message
        });
    }
}