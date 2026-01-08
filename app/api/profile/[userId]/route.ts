import db from "@/models";
import { UsersTypes } from "@/utils/types/UsersTypes";

/**
 * DELETE Endpoint for removing images on Imgur.
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const { userId }:RequestTypes = await res.params;

        const user:UsersTypes = await db.users.findOne({
            attributes: [
                "id", "name", "image", "role", "createdAt"
            ],
            where: {
                id: userId
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
        });

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