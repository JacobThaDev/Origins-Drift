import { auth } from "@/lib/auth";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import Axios from "axios";
import { headers } from "next/headers";

/**
 * DELETE Endpoint for removing images on Imgur.
 * @param req
 */
// eslint-disable-next-line
export async function DELETE(req: any, { params }: { params: Promise<{ deleteHash: string }> }) {
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

        const { deleteHash }:RequestTypes = await params;

        const ImgurApi = Axios.create({
            baseURL: "https://api.imgur.com/3",
            headers: {
                'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            }
        });

        const result = await ImgurApi.delete(`/image/${deleteHash}`)
                .then(r => r.data);

        if (result.status != 200) {
            return Response.json({
                error: "Failed to delete image"
            })
        }

        return Response.json(result);
    } catch (e:any) {
        console.error(e.response);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    deleteHash: string;
}