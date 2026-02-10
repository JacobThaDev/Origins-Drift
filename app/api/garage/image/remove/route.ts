import { auth } from "@/lib/auth"; // Your BetterAuth server instance // If using NextAuth v5, or use getServerSession for v4
import { headers } from "next/headers";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import { NextRequest } from "next/server";
import { z } from 'zod';
import db from "@/models";
import { revalidateTag } from "next/cache";
import Axios from "axios";

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

        const { car_id }:ImgurInput = result.data;

        const car = await db.garage.findOne({
            where: {
                owner: session.session.userId,
                car_id: car_id
            }
        })

        if (!car) {
            return Response.json({
                error: "Car not found in garage."
            }, { status: 400 })
        }
        
        if (car.delete_hash && process.env.IMGUR_CLIENT_ID) {
            // delete the image on imgur server if removed from the car
            try {
                 const ImgurApi = Axios.create({
                    baseURL: "https://api.imgur.com/3",
                    headers: {
                        'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
                    }
                });

                const result = await ImgurApi.delete(`/image/${car.delete_hash}`)
                        .then(r => r.data);

                if (result.status == 200) {
                    console.log("Image removed.");
                }
            } catch (err:any) {
                console.log(err);
            }
        }

        const updated = await car.update({
            image_url: null,
            delete_hash: null
        });

        revalidateTag(`garage-${session.session.userId}`, 'max');

        return Response.json({
            success: true,
            updated: updated
        });
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}