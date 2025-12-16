namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_SITE_URL: string;
        AUTH_SECRET: string;
        MYSQL_HOST: string;
        MYSQL_PORT: number;
        MYSQL_USER: string;
        MYSQL_PASS: string;
        MYSQL_DATABASE: string;
        USE_DEV: boolean;
        NEXT_PUBLIC_DISCORD_CLIENT_ID: string;
        DISCORD_CLIENT_SECRET:string;
        MYSQL_CERT:string;
        SERVER_TOKEN:string;
    }
}