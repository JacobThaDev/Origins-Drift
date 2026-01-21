const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://127.0.0.1:3000') + "/api";

const LocalApi = {
    async request(endpoint: string, options: RequestInit = {}) {
        const url = `${BASE_URL}${endpoint}`;
        
        const defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, {
            ...options,
            credentials: 'include',
            /*next: { 
                revalidate: 0 
            },*/
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

    get: (url: string, options?: RequestInit) => LocalApi.request(url, { ...options, method: 'GET' }),
    delete: (url: string, options?: RequestInit) => LocalApi.request(url, { ...options, method: 'DELETE' }),
    post: (url: string, data: any, options?: RequestInit) => 
        LocalApi.request(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
    // Add put, delete, etc., as needed
};

export default LocalApi;