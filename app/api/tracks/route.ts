import { TracksTypes } from "@/utils/types/TracksTypes";
import { getTracksData } from "../data";


/**
 * Get a specific tracks details
 * @param req 
 * @param res 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    const searchParams = req.nextUrl.searchParams;
    const classType    = searchParams.get("class") || "a";

    if (classType != "a" && classType != "s1") {
        return Response.json({
            error: { 
                message: "Invalid class. Must be either A or S1."
            }
        })
    }
    
    try {
        const trackData:TracksTypes[]|undefined = await getTracksData(classType);

        if (!trackData) {
            return Response.json({
                error: "Tracks not found."
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