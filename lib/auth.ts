import { betterAuth } from "better-auth";

import {
	bearer,
	multiSession,
	oAuthProxy,
	openAPI,
	customSession,
} from "better-auth/plugins";

import { Pool, createPool } from "mysql2/promise";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "@better-auth/passkey";
import { getFullUserProfile } from "./user-service";

const globalForDb = global as unknown as { conn: Pool | undefined };

const pool = globalForDb.conn ?? createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? process.env.MYSQL_PORT : 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    ssl : process.env.MYSQL_CERT == undefined ? undefined : {
        ca: process.env.MYSQL_CERT
    },
    waitForConnections: true,
    connectionLimit: 3, 
    queueLimit: 0,
    pool: {
        max: 3,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

export const auth = betterAuth({
	appName: process.env.NEXT_PUBLIC_SITE_NAME,
    baseURL: process.env.NEXT_PUBLIC_SITE_URL,
    trustedOrigins: [
        process.env.NEXT_PUBLIC_SITE_URL
    ],
	database: pool,
	 account: {
		accountLinking: {
			trustedProviders: [
                "google", 
                "discord",
                "github"
            ],
		},
	},
	socialProviders: {
        discord: {
			clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "",
			clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
		},
        google: {
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}
	},
	plugins: [
		passkey(),
		openAPI(),
		bearer(),
		multiSession(),
		oAuthProxy(),
		nextCookies(),
		customSession(async (session) => {
            const user_id = session.session.userId;
            const profile = await getFullUserProfile(user_id);
            
            if (!profile) {
                return {
                    // return nothing  
                };
            }

			return {
				...session,
				user: profile.user,
                discord: profile.discord
			};
		})
	]
});