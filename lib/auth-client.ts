"use client"
import { createAuthClient } from "better-auth/react";
import {
	organizationClient,
	twoFactorClient,
	adminClient,
	multiSessionClient,
	//oneTapClient,
	oidcClient,
	genericOAuthClient,
} from "better-auth/client/plugins";

import { toast } from "sonner";
import { passkeyClient } from "@better-auth/passkey/client";

export const client = createAuthClient({
	plugins: [
		organizationClient(),
		twoFactorClient({
			onTwoFactorRedirect() {
				window.location.href = "/two-factor";
			},
		}),
		passkeyClient(),
		adminClient(),
		multiSessionClient(),
		/*oneTapClient({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			promptOptions: {
				maxAttempts: 1,
			},
		}),*/
		oidcClient(),
		genericOAuthClient(),
		
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
    getSession,
    revokeSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
    listAccounts
} = client;

client.$store.listen("$sessionSignal", async () => {});