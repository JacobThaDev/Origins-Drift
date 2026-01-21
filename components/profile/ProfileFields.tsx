"use client";

import { UsersTypes } from "@/utils/types/UsersTypes";
import Link from "next/link";
import { CheckCircleIcon, CheckIcon, TagIcon } from "@heroicons/react/24/outline";
import Container from "../layout/Container";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import { XboxIcon } from "../icons/XboxIcon";
import { WindowsIcon } from "../icons/WindowsIcon";
import { SteamIcon } from "../icons/SteamIcon";
import { PlaystationIcon } from "../icons/PlaystationIcon";
import { useState } from "react";
import { GamingPlatform } from "@/utils/types/PlatformsTypes";
import { getPlatformLink } from "@/utils/Functions";

const ProfileFields = ({ userData }: { userData:UsersTypes }) => {

    const { 
        profile, updateProfile, showBanner, selectedCar, loading
    }:ProfileContextTypes = useProfileContext();

    /**
     * get form data as object, and pass it to updateProfile in the ProfileProvider
     * @param e form event
     */
    const submitForm = async(e:any) => {
        e.preventDefault();
        const formData   = new FormData(e.target);
        const dataObject = Object.fromEntries(formData.entries());

        const data:any = {
            ...dataObject,
            favorite_car: selectedCar?.id
        }

        updateProfile(data);
    }

    const [ platform, setPlatform ] = useState<GamingPlatform|null>(profile.AccountData.platform);
    const [ platformId, setPlatformId ] = useState<string|null>(profile.AccountData.platform_name);

    const platform_link = platform && platformId && getPlatformLink(platform, platformId);

    return(
        <>
        <div className={`fixed bottom-[-80px] left-0 h-[80px] transition-all duration-500 ${showBanner ? "translate-y-[-80px]" : ""} bg-success w-full z-50 flex items-center justify-center`}>
            <Container>
                <div className="flex items-center gap-3">
                    <CheckCircleIcon height={30}/>
                    <p>Your changes have been saved</p>
                </div>
            </Container>
        </div>

        <form method="post" id="updateForm" onSubmit={(e:any) => submitForm(e)}>
            
            <div className="bg-card border-[1px] border-border p-7 rounded-2xl mb-5">
                
                <p>About Me &#40;Max 500 chars.&#41;</p>
                <p className="text-sm text-muted mb-5">
                    Tell other members about yourself and your drifting style
                </p>

                <textarea 
                    className="bg-black/20 rounded-xl w-full px-5 py-3 min-h-[140px]"
                    maxLength={500}
                    name="about_me"
                    placeholder="Introduce yourself or leave a nice message for everyone! :)"
                    defaultValue={profile.AccountData?.about_me ?? ""}/>
            </div>

            <div className="bg-card p-7 border-[1px] border-border rounded-2xl mb-5">
                <p>Primary Platform</p>
                <p className="text-sm mb-5 text-white/60">
                    Select your preferred platform where you mainly play Forza Horizon games.
                </p>

                <div className="mb-3">
                    <input type={"hidden"} 
                        name="platform" value={platform ? platform : "XBOX" } readOnly
                            className="text-black"/>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-5 gap-3 md:gap-7">
                        <button
                            onClick={() => setPlatform("XBOX")}
                            type="button"
                            className={`p-6 py-1 md:py-6 w-full flex flex-row md:flex-col items-center md:justify-center gap-x-3 bg-secondary/30 border-2 border-border rounded-xl text-muted hover:border-info/30 hover:bg-info/10 hover:text-info ${platform == "XBOX" && "!bg-success/10 !border-success/50 !text-success"}`}>
                            <XboxIcon height={48} className="mb-1 max-w-[28px] md:max-w-[48px]"/>
                            <p>Xbox</p>
                        </button>

                        <button
                            onClick={() => setPlatform("WINDOWS")}
                            type="button"
                            className={`p-6 py-1 md:py-6 w-full flex flex-row md:flex-col items-center md:justify-center gap-x-3 bg-secondary/30 border-2 border-border rounded-xl text-muted hover:border-info/30 hover:bg-info/10 hover:text-info ${platform == "WINDOWS" && "!bg-success/10 !border-success/50 !text-success"}`}>
                            <WindowsIcon height={48} className="mb-1 max-w-[28px] md:max-w-[48px]"/>
                            <p>Xbox &#40;PC&#41;</p>
                        </button>

                        <button
                            onClick={() => setPlatform("STEAM")}
                            type="button"
                            className={`p-6 py-1 md:py-6 w-full flex flex-row md:flex-col items-center md:justify-center gap-x-3 bg-secondary/30 border-2 border-border rounded-xl text-muted hover:border-info/30 hover:bg-info/10 hover:text-info ${platform == "STEAM" && "!bg-success/10 !border-success/50 !text-success"}`}>
                            <SteamIcon height={48} className="mb-1 max-w-[28px] md:max-w-[48px]"/>
                            <p>Steam</p>
                        </button>

                        <button
                            onClick={() => setPlatform("PLAYSTATION")}
                            type="button"
                            className={`p-6 py-1 md:py-6 w-full flex flex-row md:flex-col items-center md:justify-center gap-x-3 bg-secondary/30 border-2 border-border rounded-xl text-muted hover:border-info/30 hover:bg-info/10 hover:text-info ${platform == "PLAYSTATION" && "!bg-success/10 !border-success/50 !text-success"}`}>
                            <PlaystationIcon height={48} className="mb-1 max-w-[28px] md:max-w-[48px]"/>
                            <p>Playstation</p>
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
                        <div className="w-full relative">
                            <TagIcon height={22} className="absolute top-3 left-3 text-white/50"/>
                            <input 
                                type="text" 
                                name="platform_name"
                                className="bg-black/20 rounded-xl w-full px-5 py-3 !ps-10"
                                placeholder="Platform ID"
                                onChange={(e:any) => setPlatformId(e.target.value)}
                                defaultValue={userData.AccountData?.platform_name ?? ""}/>
                        </div>
                    </div>
                </div>

                {platform_link && 
                <div className="truncate max-w-full">
                    <p className="text-sm text-muted">Platform Url:</p>
                    <Link target="_blank" 
                        className="text-info w-full truncate overflow-hidden max-w-full"
                        rel="nofollow" 
                        href={platform_link}>
                        {platform_link}
                    </Link>
                </div>}
            </div>
            
            {/* <CarSelector /> */}
            
            <button 
                disabled={showBanner == true || loading} 
                type="submit"
                className="border-2 border-border hover:bg-success hover:border-success hover:text-black font-semibold transition disabled:opacity-50 disabled:hover:bg-button rounded-xl px-7 py-4 flex items-center gap-3">
                <CheckIcon height={20} strokeWidth={3}/>
                <span>Update Profile</span>
            </button>
        </form>
        </>
    )
}

export default ProfileFields;