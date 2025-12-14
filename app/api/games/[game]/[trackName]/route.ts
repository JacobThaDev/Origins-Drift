import db from '@/models/index';

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
                error: "Game not found"
            });
        }

        const track = await db.tracks.findOne({
            where: {
                short_name: trackName
            }
        });

         if (!track) {
            return Response.json({
                error: "Track not found in "+game.name+""
            });
        }

        return Response.json(track);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            success: false,
            message: e.message
        });
    }
}