import { getCachedScores } from '@/app/api/data';
import db from '@/models/index';
import { GamesTypes } from '@/utils/types/GamesTypes';
import { TracksTypes } from '@/utils/types/TracksTypes';

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

       const trackData:TracksTypes = await db.tracks.findOne({
            attributes: ['id','name', 'short_name', 'length', 'game', 'favorite', 'track_image'],
            where: {
                short_name: trackName
            }
        });

        if (!trackData) {
            return Response.json({
                error: "Track not found."
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