"use client";

import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/client";
import { PowerIcon } from '@heroicons/react/24/outline'

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
        <button 
            onClick={() => logout()} 
            aria-label="Sign out"
            title="Sign out"
            className="hover:bg-danger/70 transition-all p-2 text-white/50 rounded-full outline-0">
            <PowerIcon width={24} strokeWidth={2}  />
        </button>
    )
}

export default SignOutButton;