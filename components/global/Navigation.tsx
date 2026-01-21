"use client"

import Container from "../layout/Container";
import Link from "next/link";
import links from '@/cfg/NavLinks';
import { useEffect, useRef, useState } from "react";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import Image from "next/image";
import { UserIcon } from "../icons/UserIcon";
import { client } from '@/lib/auth-client';
import { ArrowRightStartOnRectangleIcon, Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Navigation = () => {

    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
    const { session, setSession, setProfile }:ProfileContextTypes = useProfileContext();
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ showLogout, setShowLogout ] = useState<boolean>();

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

    const logout = async() => {
        await client.signOut({
            fetchOptions: {
                onSuccess: () => {
                    //router.push("/");
                    setProfile(null);
                    setSession(null);
                },
                onError: (err:any) => {
                    console.log(err);
                }
            }
        });
    }

    return(
        <>

        {showLogout && 
        <div className="fixed w-full h-full bg-background/80 backdrop-blur-md flex items-center justify-center z-[1051]" >
            <div className="bg-card p-7 w-full rounded-xl max-w-[300px]">
                <p className="text-muted">Confirm Action</p>
                <p className="text-lg text-white font-bold mb-5">Do you wish to logout?</p>
                <hr className="my-3 border-border"/>
                <div className="flex gap-2">
                    <button onClick={() => logout()} className="bg-danger/10 hover:bg-danger/30 hover:text-danger rounded-full px-5 py-2">
                        Confirm
                    </button>
                    <button onClick={() => setShowLogout(false)} className="bg-secondary hover:bg-info/10 text-muted hover:text-info rounded-full px-5 py-2">
                        Cancel
                    </button>
                </div>
            </div>
        </div>}

        <div className="bg-background/80 fixed w-full z-[1000] h-[80px] flex items-center backdrop-blur-md border-b-2 border-b-border top-0">
            <Container className="flex h-full items-center justify-center">
                
                <div className="flex items-center h-full w-full justify-between">
                    <div className="lg:w-[250px] lg:min-w-[250px]">
                        <p className="text-2xl font-black">Origins</p>
                    </div>

                    <div className="hidden lg:flex items-center justify-center w-full">
                        {links.map((link:any, index:number) => {
                            return(
                                <Link href={link.url} key={index}
                                    aria-label={link.title}
                                    className={`hover:text-info flex gap-3 items-center text-muted px-7 lg:px-5 py-2 lg:py-3 transition-all lg:w-auto w-full`}>
                                    {link.title}
                                </Link>
                            )
                        })}
                    </div>
                    
                    <div className="lg:w-[250px] lg:min-w-[250px]">

                        <div className="hidden lg:flex justify-end gap-2 text-nowrap items-center relative">
                            {!session && 
                            <Link href={"/login"} className="hover:bg-info hover:text-black text-muted px-4 py-3 rounded-lg font-semibold">
                                <div className="flex gap-3 items-center">
                                    <UserIcon height={20} strokeWidth={2}/>
                                    Sign In
                                </div>
                            </Link>}

                            {!session && 
                            <Link href={"/login"} className="bg-info text-black px-4 py-3 rounded-lg font-semibold">
                                <div className="flex gap-3 items-center">
                                    Get Started
                                </div>
                            </Link>}
                            
                            {session && 
                            <Link href={"/profile"} className="inline-flex justify-center text-muted hover:bg-info hover:text-black px-4 h-10 rounded-lg group">
                                <div className="flex gap-3 items-center">
                                    <UserIcon width={16} strokeWidth={2} />
                                    <p>My Profile</p>
                                </div>
                            </Link>}
                                
                            <div className="relative">
                                {session && 
                                <button 
                                    onClick={() => setShowLogout(true)}
                                    className="relative bg-secondary/80 text-muted hover:bg-danger/30 hover:text-danger rounded-full h-10 w-10 flex items-center justify-center">
                                    <ArrowRightStartOnRectangleIcon width={16} strokeWidth={2} />
                                </button>}
                            </div>
                        </div>
                        
                        <div className="flex w-full justify-end lg:hidden">
                            <button id="mobile-menu"
                                onClick={() => setMenuOpen(true)}
                                className="text-muted hover:bg-info/10 hover:text-info px-5 rounded-xl h-10 flex items-center justify-center">
                                Menu
                            </button>
                        </div>

                    </div>
                </div>
            </Container>
        </div>

        <div className={`fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm z-[1049] ${!menuOpen && "hidden"} lg:!hidden`}></div>

        <div ref={dropdownRef} className={`fixed top-0 right-[-300px] ${menuOpen && 'translate-x-[-300px]'} h-full w-[300px] bg-card z-[1050] transition-all duration-300 shadow-lg shadow-black lg:!hidden`}>
            {session ?
                <div className="flex flex-col items-center justify-start bg-black/20 py-5 px-7 gap-5 relative">
                    <div className="absolute top-5 right-5">
                        <button 
                            onClick={() => setMenuOpen(false)}
                            className="relative bg-secondary/80 text-muted hover:bg-danger/30 hover:text-danger rounded-full h-10 w-10 flex items-center justify-center">
                            <XMarkIcon height={20}/>
                        </button>
                    </div>
                    <Link href="/profile">
                        <Image 
                            className="rounded-full"
                            src={session.user.image}
                            width={72}
                            height={72}
                            alt=""/>
                    </Link>

                    <div className="text-center">
                        <p className="text-white/50">Signed in as</p>
                        <p className="text-2xl font-black mb-2">{session.user.name}</p>
                    </div>
                </div>
            : <>
                 <div className="flex flex-col items-center justify-start bg-black/20 py-7 px-7 gap-5 relative overflow-hidden">
                    <div className="text-center">
                        <p className="text-white/50">Welcome, Guest!</p>
                        <p className="text-2xl font-black mb-5">Origins Drift Club</p>

                        <div className="relative inline-block">
                            <Link href="/login" className="glow-button px-5 py-2 rounded-lg">Sign In</Link>
                        </div>
                    </div>
                </div>
            </>}
            
            <div className="p-7 pb-2">
                <p className="text-white/60">Site Navigation</p>
            </div>

            <div className="flex flex-col justify-start items-start">
                {links.map((link:any, index:number) => {
                    return(
                        <Link href={link.url} key={index}
                            aria-label={link.title}
                            onClick={() => setMenuOpen(false)}
                            className={`hover:text-info flex gap-3 items-center text-muted px-7 lg:px-5 py-2 lg:py-3 transition-all lg:w-auto w-full`}>
                            {link.icon && link.icon} {link.title}
                        </Link>
                    )
                })}
            </div>

            <hr className="my-5 border-border"/>

            <div className="flex flex-col justify-start items-start">
                <div className="relative">
                    {session && 
                    <Link href={`/profile/`+session.discord.user.id} 
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-info flex gap-3 items-center text-muted px-7 lg:px-5 py-2 lg:py-3 transition-all lg:w-auto w-full">
                        <UserIcon height={20} strokeWidth={2} className="text-muted"/>
                        <p>View Profile</p>
                    </Link>}

                    {session && 
                    <Link href="/profile"  
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-info flex gap-3 items-center text-muted px-7 lg:px-5 py-2 lg:py-3 transition-all lg:w-auto w-full">
                        <Cog6ToothIcon height={20}/>
                        <p>Profile Settings</p>
                    </Link>}
                    
                    {session && 
                    <button 
                        onClick={() => {
                            setMenuOpen(false);
                            setShowLogout(true)
                        }}
                        className="text-danger flex gap-3 items-center px-7 lg:px-5 py-2 lg:py-3 transition-all lg:w-auto w-full">
                        <ArrowRightStartOnRectangleIcon height={20}/>
                        <p>Sign Out</p>
                    </button>}
                </div>
            </div>
        </div>
        </>
    );
}

export default Navigation;