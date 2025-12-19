import LocalApi from '@/services/LocalApi';

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const { data: session } = await LocalApi.get("/auth/get-session", {
            headers: {
                 // Forward the cookies from the request. without it, the user isn't logged in.
                cookie: req.headers.get("cookie") || "",
            },
        });

        if (!session) {
            return Response.json({ error: "Please log in to use this endpoint."});
        }
        



        return Response.json(session);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}