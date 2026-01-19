"use client"

import Container from "../layout/Container";
import Link from "next/link";
import links from '@/cfg/NavLinks';
import { useState } from "react";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import Image from "next/image";
import SignOutButton from "./SignOutButton";


const Navigation = () => {

    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
    const { session }:ProfileContextTypes = useProfileContext();
    
    return(
        <>
        <div className="bg-background/80 fixed w-full z-[1000] h-[80px] flex items-center backdrop-blur-md border-b-2 border-b-border top-0">
            <Container className="flex h-full items-center justify-center">
                
                <div className="flex items-center h-full w-full">
                    <div className="min-w-[250px]">
                        <p className="text-2xl font-black">Origins</p>
                    </div>
                    <div className="flex items-center justify-center w-full ">
                        {links.map((link:any, index:number) => {
                            return(
                                <NavLink key={index} url={link.url}>
                                    {link.title}
                                </NavLink>
                            )
                        })}
                    </div>
                    <div className="min-w-[250px] flex justify-center">
                       <Link href={session ? "/profile" : "/login"} className="hover:bg-info px-4 py-3 rounded-md">
                            {session && 
                            
                            <div className="flex gap-3 items-center">
                                <Image 
                                    className="rounded-full"
                                    src={session.user.image}
                                    width={24}
                                    height={24}
                                    alt=""/>
                                    My Profile
                                </div>
                            }
                       </Link>
                    </div>
                </div>
            </Container>
        </div>

        <div onClick={() => setMenuOpen(false)} 
            className={`fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm z-[1049] ${!menuOpen && "hidden"} lg:!hidden`}></div>

        <div className={`fixed top-0 right-[-300px] ${menuOpen && 'translate-x-[-300px]'} h-full w-[300px] bg-card z-[1050] transition-all duration-300 shadow-lg shadow-black lg:!hidden`}>
            {session ?
                <div className="flex flex-col items-center justify-start bg-black/20 py-5 px-7 gap-5 relative">
                    <div className="absolute top-5 right-5">
                        <SignOutButton /> 
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
                        <NavLink key={index} url={link.url}>
                            {link.icon && link.icon} {link.title}
                        </NavLink>
                    )
                })}
            </div>
        </div>
        </>
    );
}

const NavLink = ({ children, url, title }: {
    url: string;
    children?: React.ReactNode;
    title?:string;
}) => {

    return(
        <Link href={url}
            aria-label={title}
            className={`hover:text-info flex gap-3 items-center text-white/60 px-7 lg:px-5 py-2 lg:py-3 transition-all lg:w-auto w-full`}>
            {children}
        </Link>
    )
    
}

export default Navigation;