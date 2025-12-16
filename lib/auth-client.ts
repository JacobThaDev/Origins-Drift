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
import { passkey } from "@better-auth/passkey/*";

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
	appName:"Origins-Drift",
    baseURL: "https://127.0.0.1:3000",
    trustedOrigins: [
        "https://127.0.0.1:3000"
    ],
	database: createPool(process.env.MYSQL_CERT == undefined ? development_config : production_config),
	account: {
		accountLinking: {
			trustedProviders: [
                "google", 
                "github"
            ],
		},
	},
	socialProviders: {
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