import { UsersTypes } from "@/utils/types/UsersTypes";
import { DiscordMemberTypes } from "@/utils/types/discord/DiscordMemberTypes";
import { getDiscordMember, getUserByName } from "../../data";

/**
 * Get a user by user id
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const { username }:RequestTypes = await res.params;

        const user:UsersTypes = await getUserByName(username);

        if (!user) {
            return Response.json({ 
                error: "Could not find a user by that name!"
            })
        }

        const member = await getDiscordMember(user.Account.accountId) as DiscordMemberTypes;
        
        if (!member || member.error) {
            return Response.json({ 
                error: "Could not load Discord profile"
            });
        }

        return Response.json({
            ...user, 
            discord: member
        });
    } catch (e:any) {
        console.error(e);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    username: string;
}