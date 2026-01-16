"use client"

import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { LoadingIcon } from "@/components/icons/LoadingIcon";
import Container from "@/components/layout/Container";
import PlatformIcon from "@/components/leaderboards/PlatformIcon";
import LoginBox from "@/components/login/LoginBox";
import ProfileFields from "@/components/profile/ProfileFields";
import { CarsContextProvider } from "@/providers/CarsProvider";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {

    const { profile, loading, error }:ProfileContextTypes = useProfileContext();

    if (loading) {
        return <>
            <div className="absolute top-0 left-0 bg-background w-full h-full flex flex-col gap-10 items-center justify-center z-[1050]">
                <LoadingIcon height={80}/>
                <div className="text-center">
                    <p className="text-muted text-sm">Please wait</p>
                    <p>Loading profile.</p>
                </div>
            </div>
        </>
    }

    if (error) {
        return(
            <div className="w-full h-full flex  flex-col gap-10 items-center justify-center">
                <XMarkIcon height={80} strokeWidth={4}/>
                <div className="text-center">
                    <p className="text-sm text-muted">An error occured</p>
                    <p>{error}</p>
                </div>
            </div> 
        )
    }

    if (!profile) {
        return (<LoginBox/>);
    }

    const platform   = profile.AccountData?.platform;
    const platformId = profile.AccountData?.platform_name;

    return (
        <CarsContextProvider>
            <div className={`bg-header bg-black w-full min-h-[350px] max-h-[350px] lg:min-h-[400px] lg:max-h-[400px] pt-36 flex justify-center items-center text-white`}/>

            <Container>
                <div className="flex flex-col lg:flex-row gap-7 items-start justify-center lg:justify-start w-full pb-[50px]">
                    <div className="mt-[-82px] w-[200px] inline-block mx-auto">
                        <div className="relative mb-7">
                            <div className="flex justify-center w-full">
                                <Image unoptimized src={profile.image} width={175} height={175} alt="" 
                                    className="rounded-full p-3 bg-background"/>
                            </div>
                            <Link 
                                href={`https://discord.com/users/${profile.Account.accountId}`} 
                                target="_blank"
                                rel="nofollow"
                                className="absolute -bottom-3 left-1/2 -ml-7 w-14 h-14 bg-button hover:bg-buttonHover transition border-4 border-background rounded-full inline-flex items-center justify-center">
                                <DiscordIcon height={22} />
                            </Link>
                        </div>

                        {platform && platformId && 
                        
                        <div className="mb-3">
                            {platform == "XBOX" && 
                            <Link target="_blank" 
                                className="rounded-full relative inline-flex p-3 bg-button hover:bg-buttonHover w-full gap-3 text-sm items-center transition"
                                rel="nofollow" 
                                href={`https://www.xbox.com/en-us/play/user/`+(platformId)}>
                                   <PlatformIcon platform={"XBOX"}/>
                                   <span>{platformId}</span>
                            </Link>}

                            {platform == "WINDOWS" && 
                            <Link target="_blank" 
                                className="rounded-full relative inline-flex p-3 bg-button hover:bg-buttonHover w-full gap-3 text-sm items-center transition"
                                rel="nofollow" 
                                href={`https://www.xbox.com/en-us/play/user/`+(platformId)}>
                                    <PlatformIcon platform={"WINDOWS"}/>
                                    <span>{platformId}</span>
                            </Link>}

                            {platform == "STEAM" && 
                            <Link target="_blank" 
                                className="rounded-full relative inline-flex p-3 bg-button hover:bg-buttonHover w-full gap-3 text-sm items-center transition"
                                rel="nofollow" 
                                href={`https://steamcommunity.com/id/`+(platformId)}>
                                   <PlatformIcon platform={"STEAM"}/>
                                   <span>{platformId}</span>
                            </Link>}

                            {platform == "PLAYSTATION" && 
                            <Link target="_blank" 
                                className="rounded-full relative inline-flex p-3 bg-button hover:bg-buttonHover w-full gap-3 text-sm items-center transition"
                                rel="nofollow" 
                                href={`https://psnprofiles.com/`+(platformId)}>
                                    <PlatformIcon platform={"PLAYSTATION"}/>
                                    <span>{platformId}</span>
                            </Link>}
                        </div>}

                        <p className="text-white/50 mb-3 text-center text-sm">
                            Joined {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="w-full">
                        <div className="lg:mt-[-64px] mb-10 relative">
                            <p className="text-5xl font-bold">
                                {profile.AccountData?.display_name || profile.name}
                            </p>
                        </div>
                        <div>
                            <ProfileFields userData={profile}/>
                        </div>
                    </div>
                </div>
            </Container>
            
        </CarsContextProvider>
    );

}