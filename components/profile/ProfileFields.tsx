"use client";

import { UsersTypes } from "@/utils/types/UsersTypes";
import Link from "next/link";
import { CheckCircleIcon, CheckIcon, TagIcon } from "@heroicons/react/24/outline";
import CarSelector from "./CarSelector";
import Container from "../layout/Container";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";

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
            
            <div className="bg-card/70 p-4 rounded-2xl mb-5">
                <p className="mb-3 text-sm text-white/50">About Me &#40;Max 250 chars.&#41;</p>
                <textarea 
                    className="bg-black/20 rounded-xl w-full px-5 py-3"
                    maxLength={250}
                    name="about_me"
                    placeholder="Introduce yourself or leave a nice message for everyone! :)"
                    defaultValue={profile.AccountData?.about_me ?? ""}/>
            </div>

            <div className="bg-card/70 p-4 rounded-2xl mb-5">
                <p>Primary Platform</p>
                <p className="text-sm mb-5 text-white/60">
                    Select your preferred platform where you mainly play Forza Horizon games.
                </p>

                <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
                    <select name="platform" className="bg-button px-5 py-3 rounded-xl" defaultValue={profile.AccountData?.platform ?? "XBOX"}>
                        <option value="STEAM">Steam</option>
                        <option value="WINDOWS">Xbox &#40;PC&#41;</option>
                        <option value="XBOX">XBOX &#40;Console&#41;</option>
                        <option value="PS">Playstation</option>
                    </select>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
                        <div className="w-full relative">
                            <TagIcon height={22} className="absolute top-3 left-3 text-white/50"/>
                            <input 
                                type="text" 
                                name="platform_name"
                                className="bg-black/20 rounded-xl w-full px-5 py-3 !ps-10"
                                placeholder="Platform ID"
                                defaultValue={userData.AccountData?.platform_name ?? ""}/>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col text-sm text-white/60 w-full">
                    <div className="text-nowrap">
                        Platform Url:
                    </div>
                    <div className="w-full truncate">
                        {(profile.AccountData?.platform == "XBOX" || profile.AccountData?.platform == "WINDOWS") && 
                        <Link target="_blank" 
                            className="text-info w-full truncate overflow-hidden max-w-full"
                            rel="nofollow" 
                            href={`https://www.xbox.com/en-us/play/user/`+(profile.AccountData?.platform_name)}>
                                https://www.xbox.com/en-us/play/user/{profile.AccountData?.platform_name ?? "[platformId]"}
                        </Link>}

                        {profile.AccountData?.platform  == "STEAM" && 
                        <Link target="_blank" 
                            className="text-info"
                            rel="nofollow" 
                            href={`https://steamcommunity.com/id/`+(profile.AccountData?.platform_name)}>
                                https://steamcommunity.com/id/{profile.AccountData?.platform_name ?? "[platformId]"}
                        </Link>}

                        {profile.AccountData?.platform == "PLAYSTATION" && 
                        <Link target="_blank" 
                            className="text-info"
                            rel="nofollow" 
                            href={`https://psnprofiles.com/`+(profile.AccountData?.platform_name)}>
                                https://psnprofiles.com/{profile.AccountData?.platform_name ?? "[platformId]"}
                        </Link>}
                    </div>
                </div>
            </div>
            
            <CarSelector />
            
            <button 
                disabled={showBanner == true || loading} 
                type="submit"
                className="bg-button hover:bg-infodark transition disabled:opacity-50 disabled:hover:bg-button rounded-xl px-7 py-4 flex items-center gap-3">
                <CheckIcon height={20}/>
                <span>Update Profile</span>
            </button>
        </form>
        </>
    )
}

export default ProfileFields;