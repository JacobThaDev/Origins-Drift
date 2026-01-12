"use client"

import { client } from "@/lib/auth-client";
import { DiscordIcon } from "../icons/DiscordIcon";
import { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { LoadingIcon } from "../icons/LoadingIcon";

const LoginBox = () => {

    const [ agreed, setAgreed ] = useState<boolean>(false);
    const [ proceeding, setProceeding ]   = useState<boolean>(false);

    const signInDiscord = async () => {
        if (!agreed) {
            return;
        }

        setProceeding(true);
        
        await client.signIn.social({
            provider: "discord",
            callbackURL: "/",
            errorCallbackURL: "/",
        });
    }

    return(
        <div className="absolute top-0 left-0 bg-background px-[2em] w-full h-full flex flex-col gap-10 items-center justify-center z-[1050]">
            <div className="bg-card flex flex-col lg:flex-row rounded-2xl w-full max-w-[400px] lg:max-w-[750px] overflow-hidden shadow-2xl shadow-black/50">
                <div className="hidden lg:inline-block h-[200px] lg:h-[500px] min-w-[350px] login-bg text-3xl lg:text-6xl font-[impact] p-10 text-white/10">
                    
                </div>
                <div className="w-full bg-card text-center lg:p-10 flex flex-col">
                    <div className="p-10 lg:p-0">
                        <p className="text-white/70">Welcome to</p>
                        <p className="text-2xl font-black">Origins Drift Club</p>
                        
                        <div className="divider bg-buttonHover !my-5"></div>

                        <div className="text-white/70 p-3">
                            To create an account, or to login, simply
                            click the button below.
                        </div>
                    </div>

                    <div className="p-4 lg:p-0 mt-auto">
                        <div className="flex items-center text-start text-sm gap-3 rounded-xl p-5">
                            <button  onClick={() => setAgreed(proceeding ? agreed : !agreed)}
                                    className={`flex justify-center border-2 border-buttonHover w-6 h-6 min-w-6 items-center bg-black/30 rounded-md ${agreed ? "bg-success/10 border-success" : ""}`}>
                                {agreed && <CheckIcon height={18} strokeWidth={4} className="text-success" />}
                            </button>
                            <p>I agree to the <Link target="_blank" href="/legal/terms" className="text-info">Terms and Conditions</Link> </p>
                        </div>

                        <div className="flex flex-row items-center gap-2 lg:gap-2">
                            <button onClick={() => signInDiscord()} disabled={!agreed || proceeding  } className="disabled:opacity-50 disabled:cursor-not-allowed rounded-xl bg-discord hover:brightness-110 transition-all flex items-center mx-auto w-full">
                                <div className="bg-black/10 min-w-[60px] h-[60px] flex items-center justify-center">
                                    <DiscordIcon height={28}/>
                                </div>
                                <div className="text-center w-full">
                                    {proceeding ? <LoadingIcon height={30} className="mx-auto"/> : "Login with Discord" }
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginBox;