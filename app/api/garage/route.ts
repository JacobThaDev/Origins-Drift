import db from "@/models";
import { unstable_cache } from "next/cache";
import { auth } from "@/lib/auth"; // Your BetterAuth server instance // If using NextAuth v5, or use getServerSession for v4
import { headers } from "next/headers";
import { SessionsTypes } from "@/utils/types/SessionsTypes";

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
                    as: 'Cars',
                }
            ],
            raw: true,
            nest: true
        });
        
        return garage;
    },
    ['garage', user_id], {
        tags: [
            'garage',
            `garage-${user_id}`
        ]
    }
)();

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

        const garage = await getGarage(session.user.id);

        return Response.json(garage);
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}