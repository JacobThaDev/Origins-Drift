

/**
 * Get a game
 * @param req 
 * @returns 
 */

import LocalApi from "@/services/LocalApi";
import { getCachedUser } from "../data";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { revalidateTag } from "next/cache";

// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const { data: session } = await LocalApi.get("/auth/get-session", {
            headers: {
                cookie: req.headers.get("cookie") || "",
            },
        });

        if (!session) {
            return Response.json({ 
                error: "Please log in to use this endpoint."
            });
        }

        const user_id = session.user.id;
        const user:UsersTypes = await getCachedUser(user_id);

        if (!user || user.error) {
             return Response.json({ 
                error: "Could not find profile"
            });
        }

        if (user.Account.accountId != "150486701695827968") {
            return Response.json({ 
                error: "You do not have permission to use this."
            });
        }
        
        revalidateTag(`users`);
        revalidateTag(`user-records`);
        revalidateTag(`tracks`);
        revalidateTag(`leaders`);

        return Response.json({ 
            message: "Revalidated caches."
        });
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            success: false,
            message: e.message
        });
    }
}