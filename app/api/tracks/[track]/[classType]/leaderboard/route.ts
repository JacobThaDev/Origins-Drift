import { TracksTypes } from "@/utils/types/TracksTypes";
import { getCachedScores, getTrackByName } from "@/app/api/data";


/**
 * Get a specific tracks details
 * @param req 
 * @param res 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const bodyData  = await res.params;
        const trackName = bodyData?.track.toLowerCase();
        const classType = bodyData?.classType.toLowerCase();

        if (classType != "a" && classType != "s1") {
            return Response.json({
                error: "Invalid car class. Must be either a or s1"
            });
        }

        const track:TracksTypes = await getTrackByName(trackName);

        if (!track) {
            return Response.json({
                error: "Track not found."
            });
        }

        const leaderboard = await getCachedScores(track.id, classType);

        if (!leaderboard) {
            return Response.json({
                error: "Track not found."
            });
        }

        return Response.json({
            track: track,
            leaderboard: leaderboard
        });
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}