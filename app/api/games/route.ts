import db from '@/models/index';

/**
 * Get all games and tracks
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const game = await db.games.findAll({
            include: {
                model: db.tracks
            }
        });

        if (!game) {
            return Response.json({
                error: "There was an error in your query: There are no games listed!"
            });
        }

        return Response.json(game);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            success: false,
            message: e.message
        });
    }
}