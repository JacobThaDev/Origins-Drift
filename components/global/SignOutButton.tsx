"use client";

import { PowerIcon } from '@heroicons/react/24/outline'
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import { client } from '@/lib/auth-client';

const SignOutButton = () => {

    const { setSession, setProfile }:ProfileContextTypes = useProfileContext();

    const logout = async() => {
        await client.signOut({
            fetchOptions: {
                onSuccess: () => {
                    //router.push("/");
                    setProfile(null);
                    setSession(null);
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
            className="hover:bg-danger/70 transition-all p-2 text-white/50 rounded-lg outline-0">
            <PowerIcon width={24} strokeWidth={2}  />
        </button>
    )
}

export default SignOutButton;