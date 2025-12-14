import { betterAuth } from "better-auth";

import {
	bearer,
	multiSession,
	oneTap,
	oAuthProxy,
	openAPI,
	customSession,
} from "better-auth/plugins";

import { createPool } from "mysql2/promise";
import { nextCookies } from "better-auth/next-js";
import { env as _env } from 'process';
import { passkey } from "@better-auth/passkey";

export const auth = betterAuth({
	appName: process.env.NEXT_PUBLIC_SITE_NAME as string,
    baseURL: process.env.NEXT_PUBLIC_SITE_URL as string,
    trustedOrigins: [
        process.env.NEXT_PUBLIC_SITE_URL as string
    ],
	database: createPool({
        host: process.env.MYSQL_HOST as string,
        port: process.env.MYSQL_PORT ? process.env.MYSQL_PORT as unknown as number : 3306,
        user: process.env.MYSQL_USER  as string,
        password: process.env.MYSQL_PASS  as string,
        database: process.env.MYSQL_DATABASE  as string,
        ssl : {
            ca: process.env.MYSQL_CERT as string ?? ''
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }),
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