"use client";

import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

const SignOutButton = () => {

    const router = useRouter();

    const logout = async() => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/"); // redirect to login page
                },
                onError: (err:any) => {
                    console.log(err);
                }
            }
        });
    }

    return (
        <>
            <button onClick={() => logout()} className="bg-warning/30 hover:bg-warning/70 transition-all px-5 rounded-lg py-2">
                Sign Out
            </button>
        </>
    )
}

export default SignOutButton;