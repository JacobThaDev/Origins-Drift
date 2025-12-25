"use client";

import { capitalize } from "@/utils/Functions";
import { GamingPlatform } from "@/utils/types/PlatformsTypes";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { useEffect, useState } from "react";
import { SteamIcon } from "../icons/SteamIcon";
import { XboxIcon } from "../icons/XboxIcon";
import { PlaystationIcon } from "../icons/PlaystationIcon";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

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
            <p className="mb-3 text-sm text-white/50">About Me &#40;Max 400 chars.&#41;</p>
            <textarea 
                onChange={(e:any) => setAboutMe(e.target.value as string)}
                className="bg-black/20 rounded-xl w-full px-5 py-3"
                id="about_me"
                placeholder="Introduce yourself or leave a nice message for everyone! :)"
                defaultValue={aboutMe}/>
        </div>

        <div className="bg-card/70 p-4 rounded-2xl mb-5">
            <p>Primary Platform</p>
            <p className="text-sm mb-5 text-white/60">
                Select your preferred platform where you mainly play Forza Horizon games.
            </p>
            <div className="flex w-full gap-5 mb-2">
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

                <div className="flex items-center gap-3 w-full">
                    <div className="text-nowrap text-sm text-white/70">
                        Platform Name
                    </div>
                    <div className="w-full">
                    <input 
                        type="text" 
                        onChange={(e:any) => setPlatformName(e.target.value as string)}
                        className="bg-black/20 rounded-xl w-full px-5 py-3"
                        placeholder="Your display name on the selected platform"
                        defaultValue={userData.AccountData?.platform_name}/>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 text-sm text-white/60">
                <div>
                    Platform Url:
                </div>
                <div>
                    {(platform == "XBOX" || platform == "WINDOWS") && 
                    <Link target="_blank" 
                        className="text-info"
                        rel="nofollow" 
                        href={`https://www.xbox.com/en-us/play/user/`+(platformName)}>
                            https://www.xbox.com/en-us/play/user/{platformName}
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
        
        <button type="button" className="bg-button hover:bg-infodark transition rounded-xl px-7 py-4 flex items-center gap-3">
            <CheckIcon height={20}/>
            <span>Update Profile</span>
        </button>
        
        {/*<form method="post" action="" onSubmit={() => {}}>

            <table className="table">
                <tbody>
                    <tr>
                        <td className="min-w-[150px] text-nowrap text-end text-sm text-white/70">
                            Display Name
                        </td>
                        <td className="w-full">
                            <input 
                                type="text" 
                                name="about_me"
                                className="bg-black/20 rounded-xl w-full px-5 py-3"
                                placeholder="Tell us a bit about yourself or let people know what you're up to!"
                                defaultValue={userData.AccountData?.display_name}/>
                        </td>
                    </tr>

                    <tr>
                        <td className="min-w-[150px] text-nowrap text-end text-sm text-white/70">
                            About me
                        </td>
                        <td className="w-full">
                            <input 
                                type="text" 
                                name="about_me"
                                className="bg-black/20 rounded-xl w-full px-5 py-3"
                                placeholder="Tell us a bit about yourself or let people know what you're up to!"
                                defaultValue={userData.AccountData?.about_me}/>
                        </td>
                    </tr>

                    <tr>
                        <td className="min-w-[150px] text-nowrap text-end text-sm text-white/70">
                            Platform
                        </td>
                        <td className="w-full">
                            <div className="flex w-full gap-5 mb-1">

                                <div className="relative">
                                    <button type="button" 
                                        id="platform-toggle"
                                        onClick={() => setPlatformOpen((prev) => !prev)}
                                        className="relative inline-block bg-button hover:bg-buttonHover overflow-hidden px-5 py-2.5 rounded-xl w-[150px]">
                                        {capitalize(platform)}
                                    </button>
                                    <div className={`absolute top-12 w-[200px] bg-button overflow-hidden rounded-lg ${platformOpen ? "" : "hidden"}`} id="platform-menu">
                                        <button onClick={() => setPlatform("STEAM")} type="button" id="platform-btn"
                                                className="flex items-center gap-2 hover:bg-buttonHover px-3 py-3 w-full">
                                            <SteamIcon height={26}/>
                                            Steam
                                        </button>
                                        <button onClick={() => setPlatform("XBOX")} type="button" id="platform-btn"
                                                className="flex items-center gap-2 hover:bg-buttonHover px-3 py-3 w-full">
                                            <XboxIcon height={26}/>
                                            Xbox / Windows
                                        </button>
                                        <button onClick={() => setPlatform("PLAYSTATION")} type="button" id="platform-btn"
                                                className="flex items-center gap-2 hover:bg-buttonHover px-3 py-3 w-full">
                                            <PlaystationIcon height={26}/>
                                            Playstation
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full">
                                    <div className="text-nowrap text-sm text-white/70">
                                        Platform Name
                                    </div>
                                    <div className="w-full">
                                    <input 
                                        type="text" 
                                        onChange={(e:any) => setPlatformName(e.target.value as string)}
                                        className="bg-black/20 rounded-xl w-full px-5 py-3"
                                        placeholder="Your display name on the selected platform"
                                        defaultValue={userData.AccountData?.platform_name}/>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-sm text-white/60 text-end">
                                Platform Link
                            </p>
                        </td>
                        <td>
                            {platform == "XBOX" && 
                            <Link target="_blank" 
                                className="text-info"
                                rel="nofollow" 
                                href={`https://www.xbox.com/en-us/play/user/`+(platformName)}>
                                    https://www.xbox.com/en-us/play/user/{platformName}
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
                        </td>
                    </tr>
                </tbody>
            </table>

        </form>*/}
        </>
    )
}

export default ProfileFields;