import { getUserByNameWithId, getUserTrackRecords } from "@/app/api/data";
import { UsersTypes } from "@/utils/types/UsersTypes";

type RouteContext = {
    params: Promise<{ username: string, class:string }>;
};

/**
 * get all cars in a users garage
 * @param req
 * @returns an array of cars in the users garage
 */
// eslint-disable-next-line
export async function GET(req: any, { params } : RouteContext) {
    try {
        const { username, class:classType } = await params;

        if (!username || username.length == 0 || username.length > 30) {
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

        const track_records = await getUserTrackRecords(user.id, classType);

        return Response.json(track_records);
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}