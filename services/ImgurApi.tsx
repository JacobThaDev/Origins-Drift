import Axios from "axios";
import { env as _env } from 'process';

// 1. Remove NEXT_PUBLIC_ to keep this secret on the server
const CLIENT_ID = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID;

if (!CLIENT_ID) {
    throw new Error("Missing NEXT_PUBLIC_IMGUR_CLIENT_ID in environment variables");
}

const ImgurApi = Axios.create({
    baseURL: "https://api.imgur.com/3",
    headers: {
        'Authorization': `Client-ID ${CLIENT_ID}`,
    }
});

export default ImgurApi;