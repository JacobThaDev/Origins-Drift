"use client";

import Container from "@/components/layout/Container";
import LocalApi from "@/services/LocalApi";
import { AccountTypes } from "@/utils/types/AccountTypes";
import { DiscordMemberTypes } from "@/utils/types/discord/DiscordMemberTypes";
import { use, useEffect, useState } from "react";

export default function PublicProfile({ params }: { params: Promise<{ discordId: string }>}) {

    const { discordId } = use(params);

    const [ member, setMember ]   = useState<ProfileTypes>();

    const [ mounted, setMounted ] = useState<boolean>();
    const [ error, setError ]     = useState<string>();
    const [ loading, setLoading ] = useState<boolean>();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function getUserData() {
            setLoading(true);

            const result:ProfileTypes = await LocalApi.get("/discord/member/"+discordId+"")
                .then(r=>r.data);

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
                return;
            }

            setMember(result);
            setLoading(false);
        }

        getUserData();
    },// eslint-disable-next-line 
    [mounted])

    return (
        <>
            <div 
                className={`bg-header w-full min-h-[350px] max-h-[350px] lg:min-h-[400px] lg:max-h-[400px] pt-40 flex items-center text-white`}>
                <Container>
                    <div className="flex items-center gap-10">
                        <div>
                            <p className="text-3xl lg:text-5xl font-bold mb-3">
                                {member?.account.User?.name}
                            </p>
                            <p>{ loading ? "Fetching Profile..." : error ? error : ""}</p>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="py-16">
                <Container>
                    <div className="flex gap-3 flex-col lg:flex-row">
                        
                    </div>
                </Container>
            </div>
        </>
    );

}

interface ProfileTypes {
    account: AccountTypes,
    discord: DiscordMemberTypes,
    error?: { 
        message: string, 
        code: number 
    };
}