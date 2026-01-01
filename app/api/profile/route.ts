import db from '@/models';
import LocalApi from '@/services/LocalApi';

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        if (req.headers.get("cookie") == "" || req.headers.get("cookie") == undefined) {
            return Response.json({ error: "Please log in to use this endpoint."});
        }

        const { data: session } = await LocalApi.get("/auth/get-session", {
            headers: {
                 // Forward the cookie header from the request. without it, the user isn't logged in.
                cookie: req.headers.get("cookie") || "",
            },
        });

        if (!session) {
            return Response.json({ 
                error: "Please log in to use this endpoint."
            });
        }
        
        const user_id = session.user.id;

        const user = await db.users.findOne({
            attributes: [
                "id", "name", "image", "role", "createdAt"
            ],
            where: {
                id: user_id
            },
            include: [
                {
                    model: db.accountData,
                    as: "AccountData"
                },
                {
                    model: db.account,
                    as: "Account",
                    attributes: [
                        "accountId", "providerId"
                    ]
                }
            ]
        })

        return Response.json(user);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}