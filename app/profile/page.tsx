import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { PlaystationIcon } from "@/components/icons/PlaystationIcon";
import { SteamIcon } from "@/components/icons/SteamIcon";
import { WindowsIcon } from "@/components/icons/WindowsIcon";
import { XboxIcon } from "@/components/icons/XboxIcon";
import Container from "@/components/layout/Container";
import ProfileFields from "@/components/profile/ProfileFields";
import LocalApi from "@/services/LocalApi";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Profile() {

    const header = await headers();

    const userData:UsersTypes = await LocalApi.get("/profile", {
        headers: {
            cookie: header.get("cookie")
        },
    }).then(r => r.data);

    let displayName  = userData.name;
    const platform   = userData.AccountData?.platform;
    const platformId = userData.AccountData?.platform_name;

    if (userData.AccountData) {
        if (userData.AccountData.display_name) {
            displayName = userData.AccountData.display_name;
        }
    }

    return (
        <>
            <div className={`bg-header bg-black w-full min-h-[350px] max-h-[350px] lg:min-h-[400px] lg:max-h-[400px] pt-36 flex justify-center items-center text-white`}/>

            <Container>
                <div className="flex relative gap-7 items-start w-full">
                    <div className="mt-[-82px] min-w-[200px]">
                        <div className="relative mb-7">
                            <div className="flex justify-center w-full">
                                <Image unoptimized src={userData.image} width={175} height={175} alt="" 
                                    className="rounded-full p-3 bg-background"/>
                            </div>
                            <Link 
                                href={`https://discord.com/users/${userData.Account.accountId}`} 
                                target="_blank"
                                rel="nofollow"
                                className="absolute -bottom-3 left-1/2 -ml-7 w-14 h-14 bg-button hover:bg-buttonHover transition border-4 border-background rounded-full inline-flex items-center justify-center">
                                <DiscordIcon height={22} />
                            </Link>
                        </div>

                        <div className="mb-3">
                            {platform == "XBOX" && 
                            <Link target="_blank" 
                                className="rounded-full relative inline-flex p-3 bg-button hover:bg-buttonHover w-full gap-3 text-sm items-center transition"
                                rel="nofollow" 
                                href={`https://www.xbox.com/en-us/play/user/`+(platformId)}>
                                   <XboxIcon height={32} />
                                   <span>{platformId}</span>
                            </Link>}

                            {platform == "WINDOWS" && 
                            <Link target="_blank" 
                                className="rounded-full relative inline-flex p-3 bg-button hover:bg-buttonHover w-full gap-3 text-sm items-center transition"
                                rel="nofollow" 
                                href={`https://www.xbox.com/en-us/play/user/`+(platformId)}>
                                    <XboxIcon height={32} />
                                    <span>{platformId}</span>
                                    <div className="absolute font-black bg-black rounded-full text-[9px] h-[14px] w-[20px] bottom-2 left-[38px] ml-[-20px] flex items-center justify-center">
                                        PC
                                    </div>
                            </Link>}

                            {platform == "STEAM" && 
                            <Link target="_blank" 
                                className="rounded-full relative inline-flex p-3 bg-button hover:bg-buttonHover w-full gap-3 text-sm items-center transition"
                                rel="nofollow" 
                                href={`https://steamcommunity.com/id/`+(platformId)}>
                                   <SteamIcon height={32} />
                                   <span>{platformId}</span>
                            </Link>}

                            {platform == "PLAYSTATION" && 
                            <Link target="_blank" 
                                className="rounded-full relative inline-flex p-3 bg-button hover:bg-buttonHover w-full gap-3 text-sm items-center transition"
                                rel="nofollow" 
                                href={`https://psnprofiles.com/`+(platformId)}>
                                    <PlaystationIcon height={32} />
                                    <span>{platformId}</span>
                            </Link>}
                        </div>

                        <p className="text-white/50 mb-3 text-center text-sm">
                            Joined {new Date(userData.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="w-full">
                        <div className="mt-[-64px] mb-10">
                            <p className="text-5xl font-bold">
                                My Profile
                            </p>
                        </div>
                        <div>
                            <ProfileFields userData={userData}/>
                        </div>
                    </div>
                </div>
            </Container>
            
        </>
    );

}