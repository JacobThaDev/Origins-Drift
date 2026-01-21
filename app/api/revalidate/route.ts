/**
 * revalidates all caches. this should be removed before prod
 * @param req 
 * @returns 
 */
import { revalidateTag } from "next/cache";

// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        
        revalidateTag(`users`);
        revalidateTag(`user-records`);
        revalidateTag(`tracks`);
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