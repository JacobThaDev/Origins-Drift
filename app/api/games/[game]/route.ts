import db from '@/models/index';
import { unstable_cache } from 'next/cache';

/**
 * Gets a list of games and all tracks for each game.
 * @param gameSymbol the games symbol. (`fh4`, `fh5`, `fh6`)
 * @returns a list of games and available tracks for each game
 */
const getCachedGames = (gameSymbol:string) => unstable_cache(
    async () => {
        return await db.games.findOne({
            where: {
                symbol: gameSymbol
            },
            include: [
                {
                    model: db.tracks,
                    as: 'tracks',
                    include: [{
                        model: db.games,
                        as: 'Game'
                    }],
                },
            ],
            order: [
                ['tracks', 'favorite', 'DESC'],
                ['tracks', 'id', 'ASC']
            ]
        });
    },
    ['games', String(gameSymbol)], {
        tags: [
            'games',
            `games-${gameSymbol}`
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