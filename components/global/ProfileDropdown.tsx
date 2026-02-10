'use client'
import { getAvatar } from "@/utils/Functions";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import { ChevronDownIcon, Cog6ToothIcon, PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { CarIcon } from "../icons/CarIcon";

const ProfileDropdown = ({ session, setShowLogout } : { session:SessionsTypes, setShowLogout:(arg1:boolean) => void}) => {

    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
    const [ mounted, setMounted ] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);
        
    useEffect(() => {
        if (!mounted) {
            return;
        }
        document.addEventListener("click", handleDocumentClick)
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    }, [mounted]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDocumentClick = (event: any) => {
        if (event.target.id == "mobile-menu")
            return;

        if (event.target.href) {
            setMenuOpen(false);
        }

        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    }

    return(
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setMenuOpen(prev => !prev)} className="inline-flex outline-none justify-center text-muted hover:bg-info hover:text-black px-4 h-10 rounded-lg group relative">
                <div className="flex gap-3 items-center">
                    <UserIcon width={16} strokeWidth={2} />
                    <p>My Profile</p>

                    <ChevronDownIcon height={16} />
                </div>
            </button>

            {menuOpen && 
                <div className="absolute top-full mt-8 shadow-xl shadow-black/50 right-0 w-[270px] bg-card border-[1px] border-secondary rounded-xl overflow-hidden">
                    
                    <div className="p-4 bg-black/20 flex gap-4">
                        { session && session.user && <><Image
                            unoptimized
                            src={getAvatar(session.discord.user.id, session.discord.user.avatar)}
                            width={50} 
                            height={50}
                            className="rounded-full border-[2px] border-border hover:border-info"
                            alt="" />
                        <div className="w-full">
                            <p className="text-sm text-muted">Signed in as</p>
                            <p className="text-lg">{session.user.name}</p>
                        </div>
                        <div className="ml-auto">
                            <button onClick={() => setShowLogout(true)}
                                className="hover:bg-danger/70 transition-all p-2 text-white/50 rounded-full outline-0">
                                <PowerIcon width={24} strokeWidth={2}  />
                            </button>
                        </div>
                        </>}
                    </div>
                    <div className="flex flex-col py-3">

                        <Link href={`/profile/`+session.user.discord_name} 
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-info flex gap-3 items-center text-muted px-7 lg:px-5 py-2 transition-all w-full">
                            <UserIcon height={20} strokeWidth={2}/>
                            <p>Profile</p>
                        </Link>

                        <Link href={`/garage/`} 
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-info flex gap-3 items-center text-muted px-7 lg:px-5 py-2 transition-all w-full">
                            <CarIcon height={20} strokeWidth={2}/>
                            <p>My Garage</p>
                        </Link>

                        <hr className="border-secondary my-1"/>

                        <Link href="/profile"  
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-info flex gap-3 items-center text-muted px-7 lg:px-5 py-2 transition-all w-full">
                            <Cog6ToothIcon height={20}/>
                            <p>Edit Profile</p>
                        </Link>
                    </div>    
                </div>}

        </div>
    )
}

export default ProfileDropdown;