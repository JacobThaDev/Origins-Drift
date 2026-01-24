/**
 * revalidates all caches. this should be removed before prod
 * @param req 
 * @returns 
 */
import { auth } from "@/lib/auth";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        }) as SessionsTypes;

        if (!session) {
            return Response.json({ 
                error: "Please log in to use this endpoint."
            }, { status: 401 });
        }

        revalidateTag(`users`);
        revalidateTag(`user-records`);
        revalidateTag(`tracks`);
        revalidateTag(`track-basic`);
        revalidateTag(`leaders`);
        revalidateTag(`recent`);
        revalidateTag(`discord_users`);
        
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