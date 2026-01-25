import { TracksTypes } from "@/utils/types/TracksTypes";
import { getTrackByName } from "../../data";

/**
 * Get a specific tracks details
 * @param req 
 * @param res 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, { params }: { params: Promise<{ track: string }> }) {
    try {
        const { track }  = await params;
        const trackData:TracksTypes|undefined = await getTrackByName(track.toLowerCase());

        if (!trackData) {
            return Response.json({
                error: "Track not found."
            }, { status: 400 });
        }

        return Response.json(trackData);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}