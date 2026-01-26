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
    car_id: z.number(),
    image_url: z.url(),
    delete_hash: z.string(),
});

type ImgurInput = z.infer<typeof ImgurSchema>;

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
        
        const json   = await req.json();
        const result = ImgurSchema.safeParse(json);

        if (!result.success) { // invalid post data types
            return Response.json({
                error: result.error.message
            }, { status: 400 })
        }

        const { car_id, image_url, delete_hash }:ImgurInput = result.data;

        const car = await db.garage.findOne({
            where: {
                owner: session.session.userId,
                car_id: car_id
            },
            attributes: {
                exclude: ['delete_hash', 'updatedAt'],
            }
        })

        if (!car) {
            return Response.json({
                error: "Car not found in garage."
            }, { status: 400 })
        }

        await car.update({ 
            image_url: image_url,
            delete_hash: delete_hash
        }, { where: {
            owner: session.session.userId,
            car_id: car_id
        }})

        revalidateTag(`garage-${session.session.userId}`);

        return Response.json({
            success: true,
            message: "Image saved."
        });
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}