import { getCachedGames } from "../../data";

/**
 * Get a game
 * @param req 
 * @returns 
 */

// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const bodyData = await res.params;
        const gameType = bodyData?.game.toLowerCase().replace("_", " ");

        const game = await getCachedGames(gameType);

        if (!game) {
            return Response.json({
                error: "There was an error in your query: Game does not exist."
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