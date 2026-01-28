import { getGarage, getUserByNameWithId, getUserRecentScores, getUserStats, getUserTrackRecords } from "../../../data";
import { UsersTypes } from "@/utils/types/UsersTypes";

type RouteContext = {
    params: Promise<{ username: string }>;
};

/**
 * get all cars in a users garage
 * @param req
 * @returns an array of cars in the users garage
 */
// eslint-disable-next-line
export async function GET(req: any, { params } : RouteContext) {
    try {
        const { username } = await params;

        if (!username || username.length == 0) {
            return Response.json({
                error: { 
                    message: "Invalid username."
                }
            })
        }

        const user:UsersTypes = await getUserByNameWithId(username);

        if (!user) {
            return Response.json({
                error: { 
                    message: "User does not exist."
                }
            })
        }

        const [ garage, recent_scores, track_records, stats ] = await Promise.all([
            getGarage(user.id),
            getUserRecentScores(user.id),
            getUserTrackRecords(user.id),
            getUserStats(user.id)
        ])

        return Response.json({
            stats: stats,
            records: track_records,
            garage: garage,
            recent: recent_scores
        });
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}
