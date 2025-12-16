"use client";

import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

const SignInButton = () => {

    const signIn = async () => {
        await authClient.signIn.social({
            provider: "discord",
            errorCallbackURL: "/",
        });
    }

    return (
        <>
            <button onClick={() => signIn()} className="bg-warning/30 hover:bg-warning/70 transition-all px-5 rounded-lg py-2">
                Sign In
            </button>
        </>
    )
}

export default SignInButton;