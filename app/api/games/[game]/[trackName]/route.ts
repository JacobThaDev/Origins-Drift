import db from '@/models/index';
import { GamesTypes } from '@/utils/types/GamesTypes';
import { TracksTypes } from '@/utils/types/TracksTypes';

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
            },
            include: {
                model: db.tracks,
                as: "tracks"
            }
        });

        if (!game) {
            return Response.json({
                error: "Game not found"
            });
        }

        const trackData:TracksTypes|undefined = game.tracks.find((track:TracksTypes) => 
            track.short_name.toLowerCase() == trackName.toLowerCase()
        );

        if (!trackData || trackData.length == 0) {
            return Response.json({
                error: "Invalid track"
            });
        }

        return Response.json(trackData);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}

/**
 * POST endpoint for submitting a score for a specific track
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function POST(req: any, res:any) {
    try {
        const { 
            user_id, game, track:trackName, class:classType, score, proof_url 
        }:RequestTypes = await req.json();

        if (!user_id || !game || !trackName || !classType || !score || !proof_url) {
             return Response.json({
                error: "Missing required parameters."
            });
        }

        if (classType.toLowerCase() != "a" && classType != "s1") {
            return Response.json({
                error: "Invalid class type. Must be A or S1."
            });
        }

        if (score < 0) {
             return Response.json({
                error: "Score can not be less than 0."
            });
        }
        
        const gameData:GamesTypes = await db.games.findOne({
            where: {
                symbol: game
            },
            include: {
                model: db.tracks,
                as: "tracks"
            }
        });

        if (!gameData) {
            return Response.json({
                error: "Game not found"
            });
        }

        const trackData:TracksTypes|undefined = gameData.tracks.find((track:TracksTypes) => 
            track.short_name.toLowerCase() == trackName.toLowerCase()
        );

        if (!trackData || trackData.length == 0) {
            return Response.json({
                error: "Invalid track"
            });
        }

        return Response.json({
            found: trackData
        });
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}

interface RequestTypes {
    user_id: string,
    game: GamesTypes,
    track: string,
    class: string,
    score: number,
    proof_url: string,
}