"use client"

import { UsersIcon } from "@/components/icons/UsersIcon";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import MembersCard from "@/components/members/MembersCard";
import LocalApi from "@/services/LocalApi";
import { DiscordUserTypes } from "@/utils/types/discord/DiscordUserTypes";
import { MemberListTypes } from "@/utils/types/discord/MemberListTypes"; 
import { useEffect, useState } from "react";

export default function Members() {
    
    const [ memberList, setMemberList ] = useState<MemberListTypes>();
    const [ memberCount, setMemberCount ] = useState<number>(0);
    const [ mounted, setMounted ] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function loadMembersList() {
            const list:MemberListTypes = await LocalApi.get("/discord/members");

            if (list && list.error) {
                return;
            }

            setMemberCount(list.leaders.length + list.members.length + list.coleaders.length + list.users.length);
            setMemberList(list);
        }

        loadMembersList();
    }, [mounted])
    
    return (
        <>
            <PageHeader>
                <>
                <div className="relative max-w-full text-start">

                    <p className="text-3xl lg:text-6xl font-bold mb-3">Origins Member List</p>
                    <p className="text-white/60 mb-5">
                        Our Leaders, crew members, and other drifters.
                    </p>
                            
                    <div className="flex gap-5">

                        <div className="flex items-center gap-3">
                            <UsersIcon height={18} strokeWidth={2} className="text-info"/>
                            <p className="text-white/60">{memberCount} Members</p>
                        </div>
                    </div>
                </div>
                </>
            </PageHeader>

            <div className="w-full">
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