import { auth } from "@/lib/auth"; // Your BetterAuth server instance // If using NextAuth v5, or use getServerSession for v4
import { headers } from "next/headers";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import { NextRequest } from "next/server";
import { z } from 'zod';
import db from "@/models";
import { revalidateTag } from "next/cache";

/**
 * Post request schema
 */
const ImgurSchema = z.object({
    car_id: z.number()
});

type ImgurInput = z.infer<typeof ImgurSchema>;

// eslint-disable-next-line
export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        }) as SessionsTypes;

        if (!session || session.user.banned) {
            return Response.json({ 
                error: "Unauthorized"
            }, { status: 401 });
        }
        
        const json   = await req.json();
        const result = ImgurSchema.safeParse(json);

        if (!result.success) { // invalid post data types
            return Response.json({
                error: result.error.message
            }, { status: 400 })
        }

        const { car_id }:ImgurInput = result.data;

        const created = await db.garage.create({
            owner: session.session.userId,
            car_id: car_id
        });

        if (!created) {
            return Response.json({
                error: "Car already in garage."
            }, { status: 400 })
        }

        revalidateTag(`garage-${session.session.userId}`, 'max');

        return Response.json({
            success: true,
            created: created
        });
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}