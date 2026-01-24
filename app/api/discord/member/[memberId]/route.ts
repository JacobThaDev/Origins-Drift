/**
 * Get a discord member by user id and their associated platform account
 * @param req 
 * @param res 
 */
import { getDiscordMember } from "@/app/api/data";

// eslint-disable-next-line
export async function GET(req: any, { params }: { params: Promise<{ memberId: string }> }) {
    try {
        const { memberId }:RequestTypes = await params;

        const result = await getDiscordMember(memberId);

        return Response.json(result);
    } catch (e:any) {
        console.error(e);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    memberId: string;
}