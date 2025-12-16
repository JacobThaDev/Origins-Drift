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
import { passkey } from "@better-auth/passkey";

const development_config = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? process.env.MYSQL_PORT : 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
}

const production_config = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? process.env.MYSQL_PORT : 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    ssl : {
        ca: process.env.MYSQL_CERT ?? ''
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
}

export const auth = betterAuth({
	appName: process.env.NEXT_PUBLIC_SITE_NAME,
    baseURL: process.env.NEXT_PUBLIC_SITE_URL,
    trustedOrigins: [
        process.env.NEXT_PUBLIC_SITE_URL
    ],
	database: createPool(process.env.MYSQL_CERT == undefined ? development_config : production_config),
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