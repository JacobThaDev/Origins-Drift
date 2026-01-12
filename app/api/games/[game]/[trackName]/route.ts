import db from '@/models/index';
import { LeadersTypes } from '@/utils/types/LeadersTypes';
import { TracksTypes } from '@/utils/types/TracksTypes';
import { UsersTypes } from '@/utils/types/UsersTypes';
import { revalidateTag, unstable_cache } from 'next/cache';

/**
 * Gets a track from a specific game caching the 
 * result until it's revalidated manually.
 * @param gameSymbol the game (`fh4`, `fh5`, `fh6`)
 * @param trackName the name of the track (eg. `lookout`)
 * @returns track data
 */
export const getCachedTrack = (gameSymbol:string, trackName:string) => unstable_cache(
    async () => {
        const track = await db.tracks.findOne({
            where: {
                short_name: trackName
            },
            include: {
                model: db.games,
                as: "Game",
                where: { symbol: gameSymbol }
            }
        });
        
        return track;
    },
    ['tracks', String(gameSymbol), trackName.toLowerCase()], {
        tags: [
            'tracks',
            `tracks-${gameSymbol}`,
            `tracks-${gameSymbol}-${trackName}`,
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
        
        const trackData:TracksTypes|undefined = await getCachedTrack(gameType, trackName);

        if (!trackData || trackData.error) {
            return Response.json({
                error: trackData ? trackData.error : "Track not found."
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

        if (classType.toUpperCase() != "A" && classType.toUpperCase() != "S1") {
            return Response.json({
                error: "Invalid class type. Must be A or S1."
            });
        }

        if (score < 0) {
             return Response.json({
                error: "Score can not be less than 0."
            });
        }

        const user:UsersTypes = await db.users.findOne({
            where: {
                id: user_id
            }
        });

        if (!user) {
            return Response.json({
                error: "User not found."
            });
        }
        
        const trackData:TracksTypes|undefined = await getCachedTrack(game, trackName);

        if (!trackData || trackData.error) {
            return Response.json({
                error: trackData ? trackData.error : "Track not found."
            });
        }

        const result = await db.scores.create({
            user_id: user.id,
            game: trackData.game,
            track: trackData.id,
            class: classType.toUpperCase(),
            score: score,
            proof_url: proof_url
        }) as LeadersTypes;

        if (!result) {
            return Response.json({
                error: "Failed to insert new entry."
            });
        }

        //update the specific track and class cache
        revalidateTag(`leaders-${trackData.id}-${classType.toUpperCase()}`);

        return Response.json({
            success: true,
            message: "Your score has been submitted.",
            result: result
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
    game: string,
    track: string,
    class: string,
    score: number,
    proof_url: string,
}