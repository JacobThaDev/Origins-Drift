"use client"

import Container from "@/components/layout/Container";
import LocalApi from "@/services/LocalApi";
import { DiscordUserTypes } from "@/utils/types/discord/DiscordUserTypes";
import { MemberListTypes } from "@/utils/types/discord/MemberListTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Members() {
    
    const [ members, setMembers ] = useState<MemberListTypes>();
    const [ mounted, setMounted ] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function loadMembersList() {
            const list:MemberListTypes = await LocalApi.get("discord/members").then(r=>r.data);
            setMembers(list);
        }

        loadMembersList();
    }, [mounted])
    
    return (
        <>
        <div className={`bg-header w-full min-h-[350px] max-h-[350px] lg:min-h-[400px] lg:max-h-[400px] pt-48 lg:pt-40 flex items-center text-white`}>
                <Container>
                    <div className="flex items-center gap-10">
                        <div>
                            <p className="text-3xl lg:text-5xl font-bold mb-3">
                                Origins Crew Members
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="w-full pt-24">
                <Container>
                    <p className="text-2xl">Leaders</p>
                    <p className="mb-10 text-sm text-white/70">
                        Our group leaders that organize everything
                    </p>

                    <div className="grid grid-cols-5 gap-3">
                        {members && members.leaders.map((member:DiscordUserTypes, memberIdx:number) => {
                            return(
                                <div className="bg-card rounded-xl pt-7 w-full text-center overflow-hidden" 
                                        key={`leader-${memberIdx}`}>
                                    <div className="pb-7">
                                        <Image src={member.avatar_url} 
                                            width={110} 
                                            height={110} 
                                            alt="" 
                                            className="rounded-full border-8 border-background mx-auto mb-4"/>
                                        
                                        <Link href={`/profile/${member.displayName.replaceAll("", "")}`} className="text-xl font-bold text-warning">
                                            {member.displayName}
                                        </Link>

                                        <p className="text-sm text-white/60">
                                            {member.username}
                                        </p>
                                    </div>

                                    <div className="w-full">
                                        <Link href="" className="inline-block px-5 py-3 bg-button hover:bg-buttonHover w-full">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Container>
            </div>
        </>
    );

}