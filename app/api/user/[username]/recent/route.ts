import { NextRequest } from "next/server";
import { getUserByNameWithId, getUserRecentScores } from "../../../data";
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
export async function GET(req: NextRequest, { params } : RouteContext) {
    try {
        const { username } = await params;

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
            });
        }
        
        const scores = await getUserRecentScores(user.id);
        

        return Response.json(scores);
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}