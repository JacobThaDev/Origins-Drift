"use client"

import LoadingBox from "@/components/global/LoadingBox";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import LoginBox from "@/components/login/LoginBox";
import ProfileFields from "@/components/profile/ProfileFields";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import { getAvatar } from "@/utils/Functions";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {

    const { profile, loading, error, session }:ProfileContextTypes = useProfileContext();
    
    if (loading) {
        return (<LoadingBox message="Loading Profile"/>)
    }

    if (error) {
        return (<LoadingBox message={error}/>)
    }

    if (!profile || !session) {
        return (<LoginBox/>);
    }

    return(
        <>
            <PageHeader gradient={true}>
                <>
                    <div className="relative max-w-full text-start">
                        <p className="text-3xl lg:text-6xl font-bold mb-3">Profile Settings</p>
                        <p className="text-white/60 mb-5">Manage your public profile and preferences</p>
                    </div>
                </>
            </PageHeader>
            
            <div className="pb-20">
                <Container>
                    <div className="bg-card rounded-xl border-[1px] border-border p-7 mb-5">
                        
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                            <div>
                                <p className="text-lg">Profile</p>
                                <p className="text-muted mb-5">
                                    Your Discord avatar and display name synced from your account
                                </p>
                            </div>
                            <Link href={`/profile/${session.discord.user.id}`}
                                className=" px-5 py-3 border-2 border-border rounded-lg hover:border-info hover:bg-info hover:text-black font-semibold transition-all text-nowrap">
                                Public Profile
                            </Link>
                        </div>


                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="flex w-[150px] py-5 flex-col items-center justify-center gap-5">
                                <Image unoptimized 
                                    src={getAvatar(session.discord.user.id, session.discord.user.avatar)} 
                                    width={120} 
                                    height={120} 
                                    alt="" 
                                    className="rounded-full bg-card border-info/30 border-4 p-2"/>
                            </div>

                            <div>
                                <p className="text-muted">Display Name</p>
                                <p className="text-2xl font-bold mb-3">
                                    {session.discord.user.global_name || session.discord.user.username}
                                </p>

                                <p className="text-sm text-muted">This is how other members see you across the platform.</p>
                                
                                <hr className="border-border my-3"/>

                                <div className="flex flex-col md:flex-row md:items-center gap-5">
                                    <div className="flex flex-col md:flex-row md:items-center gap-x-5">
                                        <p className="text-muted">
                                            Discord
                                        </p>
                                        <p className="text-white font-semibold">
                                            {session.discord.user.username}
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center gap-x-5">
                                        <p className="text-muted">
                                            Joined
                                        </p>
                                        <p className="text-white font-semibold">
                                            {new Date(profile.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProfileFields userData={profile}/>
                </Container>
            </div>
        </>
    )

}