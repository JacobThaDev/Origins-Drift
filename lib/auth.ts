import { betterAuth } from "better-auth";

import {
	bearer,
	multiSession,
	oneTap,
	oAuthProxy,
	openAPI,
	customSession,
} from "better-auth/plugins";

import { Pool, createPool } from "mysql2/promise";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "@better-auth/passkey";

const globalForDb = global as unknown as { conn: Pool | undefined };

const pool = globalForDb.conn ?? createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? process.env.MYSQL_PORT : 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    ssl : process.env.MYSQL_CERT == undefined ? undefined : {
        ca: process.env.MYSQL_CERT ?? ''
    },
    waitForConnections: true,
    connectionLimit: 5, 
    queueLimit: 0,
    pool: {
        max: 5,
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
		}
	},
	plugins: [
		passkey(),
		openAPI(),
		bearer(),
		multiSession(),
		oAuthProxy(),
		nextCookies(),
		oneTap(),
		customSession(async (session) => {
			return {
				...session,
				user: {
					...session.user,
					dd: "test",
				},
			};
		})
	]
});