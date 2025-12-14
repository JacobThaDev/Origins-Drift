import Axios from "axios";
import { env as _env } from 'process';

const LocalApi = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL+"/api",
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default LocalApi;