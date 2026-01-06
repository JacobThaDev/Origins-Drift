import Axios from "axios";

/**
 * DELETE Endpoint for removing images on Imgur.
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function DELETE(req: any, res:any) {
    try {
        if (!process.env.IMGUR_CLIENT_ID) {
            return Response.json({
                error: "Missing IMGUR_CLIENT_ID environment variable."
            });
        }

        const { deleteHash }:RequestTypes = await res.params;

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