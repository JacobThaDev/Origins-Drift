import db from "@/models";
import { unstable_cache } from "next/cache";
import { auth } from "@/lib/auth"; // Your BetterAuth server instance // If using NextAuth v5, or use getServerSession for v4
import { headers } from "next/headers";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import { NextRequest } from "next/server";

const getGarage = (user_id:string) => unstable_cache(
    async () => {
        const garage = await db.garage.findAll({
            where: {
                owner: user_id
            },
            attributes: {
                exclude: ['owner', 'delete_hash', 'updatedAt'],
            },
            include: [
                {
                    model: db.cars_fh5,
                    as: 'CarData',
                }
            ],
            raw: true,
            nest: true
        });
        
        return garage;
    },
    ['garage', user_id], {
        revalidate: 3600,
        tags: [
            'garage',
            `garage-${user_id}`
        ]
    }
)();

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
                error: "Please log in to use this endpoint."
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

// eslint-disable-next-line
export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        }) as SessionsTypes;

        if (!session) {
            return Response.json({ 
                error: "Please log in to use this endpoint."
            }, { status: 401 });
        }

        const garage = await getGarage(session.session.userId);

        return Response.json(garage);
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}