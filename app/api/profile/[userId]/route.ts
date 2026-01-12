import { UsersTypes } from "@/utils/types/UsersTypes";
import { getCachedUser } from "../route";


/**
 * Get a user by user id
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const { userId }:RequestTypes = await res.params;

        const user:UsersTypes = await getCachedUser(userId);

        if (!user) {
            return Response.json({ 
                error: "Could not find profile"
            });
        }

        return Response.json(user);
    } catch (e:any) {
        console.error(e.response);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    userId: string;
}