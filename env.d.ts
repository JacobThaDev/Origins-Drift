namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_SITE_NAME:string;
        NEXT_PUBLIC_SITE_DESCRIPTION:string;
        NEXT_PUBLIC_SITE_URL:string;
        NEXT_PUBLIC_SITE_KEYWORDS:string;
        NEXT_PUBLIC_DISCORD_URL:string;
        NEXT_PUBLIC_YOUTUBE_URL:string;
        NEXT_PUBLIC_GITHUB_URL:string;
        NEXT_PUBLIC_GOOGLE_CLIENT_ID:string;
        GOOGLE_CLIENT_SECRET:string;
        NEXT_PUBLIC_DISCORD_CLIENT_ID:string;
        DISCORD_CLIENT_SECRET:string;
        AUTH_SECRET:string;
        BETTER_AUTH_URL:string;
        BETTER_AUTH_SECRET:string;
        MYSQL_HOST:string;
        MYSQL_USER:string;
        MYSQL_PORT:number;
        MYSQL_PASS:string;
        MYSQL_DATABASE:string;
        GITHUB_KEY:string;
        MYSQL_CERT:string;
    }
}