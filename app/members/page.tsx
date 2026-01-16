"use client"

import Container from "@/components/layout/Container";
import MembersCard from "@/components/members/MembersCard";
import LocalApi from "@/services/LocalApi";
import { DiscordUserTypes } from "@/utils/types/discord/DiscordUserTypes";
import { MemberListTypes } from "@/utils/types/discord/MemberListTypes"; 
import { useEffect, useState } from "react";

export default function Members() {
    
    const [ memberList, setMemberList ] = useState<MemberListTypes>();
    const [ mounted, setMounted ] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function loadMembersList() {
            const list:MemberListTypes = await LocalApi.get("discord/members").then(r=>r.data);
            setMemberList(list);
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
                                Origins Members List
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="w-full py-24">
                <Container>


                    <div className="mb-10">
                        <p className="text-3xl mb-2">The Crew</p>
                        <p className="text-sm text-white/70">
                            Our group leaders that organize everything
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-20">
                        {memberList && memberList.leaders.map((member:DiscordUserTypes, memberIdx:number) => {
                            return(
                                <MembersCard member={member} key={`leader-${memberIdx}`}/>
                            )
                        })}
                        {memberList && memberList.coleaders.map((member:DiscordUserTypes, memberIdx:number) => {
                            return(
                                <MembersCard member={member} key={`coleader-${memberIdx}`}/>
                            )
                        })}
                        {memberList && memberList.members.map((member:DiscordUserTypes, memberIdx:number) => {
                            return(
                                <MembersCard member={member} key={`leader-${memberIdx}`}/>
                            )
                        })}
                    </div>

                    <div className="mb-10">
                        <p className="text-3xl mb-2">Members</p>
                        <p className="text-sm text-white/70">
                             Members of the Discord server
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-20">
                        {memberList && memberList.users.map((member:DiscordUserTypes, memberIdx:number) => {
                            return(
                                <MembersCard member={member} key={`leader-${memberIdx}`}/>
                            )
                        })}
                    </div>

                </Container>
            </div>
        </>
    );

}