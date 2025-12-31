"use client";

import { capitalize } from "@/utils/Functions";
import { GamingPlatform } from "@/utils/types/PlatformsTypes";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { useEffect, useState } from "react";
import { SteamIcon } from "../icons/SteamIcon";
import { XboxIcon } from "../icons/XboxIcon";
import { PlaystationIcon } from "../icons/PlaystationIcon";
import Link from "next/link";
import { CheckIcon, TagIcon } from "@heroicons/react/24/outline";
import CarSelector from "./CarSelector";
import { CarsTypes } from "@/utils/types/CarsTypes";

const ProfileFields = ({ userData }: { userData:UsersTypes }) => {

    let profileName  = userData.name;

    if (userData.AccountData) {
        if (userData.AccountData.display_name) {
            profileName = userData.AccountData.display_name;
        }
    }

    const [ displayName, setDisplayName ]   = useState<string|undefined>(profileName);
    const [ aboutMe, setAboutMe ]           = useState<string|undefined>(userData.AccountData?.about_me);
    const [ platform, setPlatform ]         = useState<GamingPlatform|undefined>(userData.AccountData?.platform);
    const [ platformName, setPlatformName ] = useState<string|undefined>(userData.AccountData?.platform_name);
    const [ favoriteCar, setFavoriteCar ]   = useState<CarsTypes|undefined>();
    const [ platformOpen, setPlatformOpen ] = useState<boolean>(false);

    const [ mounted, setMounted ] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        document.addEventListener("click", (e:any) => {
            const omit_list = ["platform-toggle", "platform-menu", "platform-btn"];
            const targetId = e.target.id;
            const keepOpen = omit_list.includes(targetId);

            if (targetId == "platform-toggle" || targetId == "platform-btn")
                return;

            setPlatformOpen(keepOpen ? true : false);
        });

    }, [mounted])

    const changePlatform = (platform:GamingPlatform) => { 
        setPlatform(platform);
        setPlatformOpen(false);
    }

    return(
        <>
        <div className="bg-card/70 p-4 rounded-2xl mb-5">
            <p className="mb-3 text-sm text-white/50">
                Profile display name
            </p>
            <input 
                type="text"
                id="display_name"
                onChange={(e:any) => setDisplayName(e.target.value as string)}
                className="bg-black/20 rounded-lg w-full px-5 py-3"
                defaultValue={displayName}/>
        </div>

        <div className="bg-card/70 p-4 rounded-2xl mb-5">
            <p className="mb-3 text-sm text-white/50">About Me &#40;Max 250 chars.&#41;</p>
            <textarea 
                onChange={(e:any) => setAboutMe(e.target.value as string)}
                className="bg-black/20 rounded-xl w-full px-5 py-3"
                maxLength={250}
                id="about_me"
                placeholder="Introduce yourself or leave a nice message for everyone! :)"
                defaultValue={aboutMe}/>
            <p className={`text-sm ${aboutMe && aboutMe.length >= 250 ? "text-danger" : "text-success"}`}>
                {aboutMe ? aboutMe.length : 0} / 250
            </p>
        </div>

        <div className="bg-card/70 p-4 rounded-2xl mb-5">
            <p>Primary Platform</p>
            <p className="text-sm mb-5 text-white/60">
                Select your preferred platform where you mainly play Forza Horizon games.
            </p>
            <div className="flex flex-col lg:flex-row w-full gap-5 mb-2">
                <div className="relative">
                    <button type="button" 
                        id="platform-toggle"
                        onClick={() => setPlatformOpen((prev) => !prev)}
                        className="relative inline-block bg-button hover:bg-buttonHover text-nowrap transition overflow-hidden px-5 py-2.5 rounded-xl w-[150px]">
                        {platform == "WINDOWS" ? "Xbox (PC)" : 
                            platform == "XBOX" ? "Xbox (Console)" : capitalize(platform)}
                    </button>
                    <div className={`absolute top-12 w-[200px] bg-button shadow-md overflow-hidden rounded-lg ${platformOpen ? "" : "hidden"}`} id="platform-menu">
                        <button onClick={() => changePlatform("STEAM")} type="button" id="platform-btn"
                                className="flex items-center gap-2 hover:bg-buttonHover px-3 py-3 w-full">
                            <SteamIcon height={26}/>
                            Steam
                        </button>
                        <button onClick={() => changePlatform("XBOX")} type="button" id="platform-btn"
                                className="flex items-center gap-2 hover:bg-buttonHover px-3 py-3 w-full">
                            <XboxIcon height={26}/>
                            Xbox &#40;Console&#41;
                        </button>
                        <button onClick={() => changePlatform("WINDOWS")} type="button" id="platform-btn"
                                className="flex items-center gap-2 hover:bg-buttonHover px-3 py-3 w-full">
                            <XboxIcon height={26}/>
                            Xbox &#40;PC&#41;
                        </button>
                        <button onClick={() => changePlatform("PLAYSTATION")} type="button" id="platform-btn"
                                className="flex items-center gap-2 hover:bg-buttonHover px-3 py-3 w-full">
                            <PlaystationIcon height={26}/>
                            Playstation
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
                    <div className="w-full relative">
                        <TagIcon height={22} className="absolute top-3 left-3 text-white/50"/>
                        <input 
                            type="text" 
                            onChange={(e:any) => setPlatformName(e.target.value as string)}
                            className="bg-black/20 rounded-xl w-full px-5 py-3 !ps-10"
                            placeholder="Platform ID"
                            defaultValue={userData.AccountData?.platform_name}/>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 text-sm text-white/60 w-full">
                <div className="text-nowrap">
                    Platform Url:
                </div>
                <div className="w-full">
                    {(platform == "XBOX" || platform == "WINDOWS") && 
                    <Link target="_blank" 
                        className="text-info"
                        rel="nofollow" 
                        href={`https://www.xbox.com/en-us/play/user/`+(platformName)}>
                            https://www.xbox.com/en-us/play/user/{platformName ?? "[platformId]"}
                    </Link>}

                    {platform == "STEAM" && 
                    <Link target="_blank" 
                        className="text-info"
                        rel="nofollow" 
                        href={`https://steamcommunity.com/id/`+(platformName)}>
                            https://steamcommunity.com/id/{platformName}
                    </Link>}

                    {platform == "PLAYSTATION" && 
                    <Link target="_blank" 
                        className="text-info"
                        rel="nofollow" 
                        href={`https://psnprofiles.com/`+(platformName)}>
                            https://psnprofiles.com/{platformName}
                    </Link>}
                </div>
            </div>
        </div>

        <CarSelector 
            userData={userData}
            setFavoriteCar={setFavoriteCar}
            favoriteCar={favoriteCar} />

        <button type="button" className="bg-button hover:bg-infodark transition rounded-xl px-7 py-4 flex items-center gap-3">
            <CheckIcon height={20}/>
            <span>Update Profile</span>
        </button>
        </>
    )
}

export default ProfileFields;