import { env as _env } from 'process';

// 1. Remove NEXT_PUBLIC_ to keep this secret on the server
const CLIENT_ID = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID;

if (!CLIENT_ID) {
    throw new Error("Missing NEXT_PUBLIC_IMGUR_CLIENT_ID in environment variables");
}

const ImgurAPI = { 
    async request(endpoint: string, options: RequestInit = {}) {
    const url = `https://api.imgur.com/3`;
    
    const defaultHeaders = {
        'Authorization': `Client-ID ${CLIENT_ID}`,
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        signal: AbortSignal.timeout(10000), 
    });

    if (!response.ok) {
        // You can throw a custom error here to mimic Axios error handling
        const errorData = await response.json().catch(() => ({}));
        throw { response: { data: errorData, status: response.status } };
    }

    return response.json();
},

get: (url: string, options?: RequestInit) => ImgurAPI.request(url, { ...options, method: 'GET' }),
delete: (url: string, options?: RequestInit) => ImgurAPI.request(url, { ...options, method: 'DELETE' }),
post: (url: string, data: any, options?: RequestInit) => 
    ImgurAPI.request(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
};

export default ImgurAPI;