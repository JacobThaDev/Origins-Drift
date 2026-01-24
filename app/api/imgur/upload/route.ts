import { auth } from "@/lib/auth";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import Axios from "axios";
import { headers } from "next/headers";

/**
 * POST Endpoint to uploading an image to Imgur.
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function POST(req: any, res:any) {
    try {
        if (!process.env.IMGUR_CLIENT_ID) {
            return Response.json({
                error: "Missing IMGUR_CLIENT_ID environment variable."
            });
        }

        const session = await auth.api.getSession({
            headers: await headers()
        }) as SessionsTypes;

        if (!session) {
            return Response.json({ 
                error: "Please log in to use this endpoint."
            }, { status: 401 });
        }

        const { image }:RequestTypes = await req.json();

        const imgurFormData = new FormData();
        imgurFormData.append("image", image);

        const ImgurApi = Axios.create({
            baseURL: "https://api.imgur.com/3",
            headers: {
                'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            }
        });

        const result = await ImgurApi.post("/image", imgurFormData).then(r => r.data)

        if (result.status != 200) {
            return Response.json({
                error: "Failed to upload image"
            })
        }

       return Response.json(result);
    } catch (e:any) {
        console.error(e);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    image: string;
    imageHash: string;
}