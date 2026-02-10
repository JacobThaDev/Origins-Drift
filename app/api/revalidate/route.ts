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

        if (session.user.Account.accountId != "150486701695827968") {
            return Response.json({ 
                error: "Unauthorized"
            }, { status: 401 });
        }

        revalidateTag(`users`, 'max');
        revalidateTag(`users-recent`, 'max');
        revalidateTag(`user-records`, 'max');
        revalidateTag(`user-record`, 'max');
        revalidateTag(`track-data`, 'max');
        revalidateTag(`track-hook`, 'max');
        revalidateTag(`tracks-data`, 'max');
        revalidateTag(`track-basic`, 'max');
        revalidateTag(`leaders`, 'max');
        revalidateTag(`recent`, 'max');
        revalidateTag(`discord_users`, 'max');
        
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