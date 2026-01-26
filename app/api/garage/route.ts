import { auth } from "@/lib/auth"; // Your BetterAuth server instance // If using NextAuth v5, or use getServerSession for v4
import { headers } from "next/headers";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import { NextRequest } from "next/server";
import { getGarage } from "../data";

/**
 * get all cars in a users garage
 * @param req {@link NextRequest}
 * @returns an array of cars in the users garage
 */
// eslint-disable-next-line
export async function GET(req: NextRequest) {
    try {
        // get the session
        const session = await auth.api.getSession({
            headers: await headers()
        }) as SessionsTypes;

        if (!session) {
            return Response.json({ 
                success: false,
                message: "Please log in to use this endpoint."
            }, { status: 401 });
        }

        // get the garage
        const garage = await getGarage(session.session.userId);

        return Response.json(garage);
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}