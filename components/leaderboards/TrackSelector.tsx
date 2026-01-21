"use client"

import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UsersIcon } from "../icons/UsersIcon";
import { formatNumber } from "@/utils/Functions";

const TrackSelector = () => {
    
    const { tracks, current }:TracksContextTypes = useTracksContext();
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

    const handleDocumentClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    }

    return(
        <>
            <div className="relative" ref={dropdownRef}>

                <button className={`border-2 border-border outline-0 w-full py-4 px-5 lg:min-w-[350px] text-start flex items-center rounded-xl`}
                    onClick={() => setMenuOpen(!menuOpen)} id="track-dropdown-button">
                    <div>
                        <p className="text-xs text-white/70">Select Track</p>
                        <p>{current?.name || "Unknown"} Circuit</p>
                    </div>
                    <ChevronDownIcon height={20} className="ml-auto"/>
                </button>
                
                <div className={`absolute rounded-xl top-full mt-3 w-full bg-secondary ${menuOpen ? "flex" : "hidden"} flex-col max-h-[220px] overflow-hidden overflow-y-auto scrollbar z-[50] shadow-xl shadow-black/30`} id="track-dropdown">
                    {tracks && tracks.map((track:TracksTypes, index:number) => {

                        console.log(track);
                        return(
                            <Link
                                href={`/track/${track.short_name}`} 
                                key={index} 
                                id="track-button"
                                className={`flex w-full items-center gap-3 hover:bg-card px-5 py-2 ${current == track ? "!bg-info/10" : ""}`} >
                                <div className="text-start">
                                    <p className="text-xs text-white/70" >{track.Game.name}</p>
                                    <p>{track.name}</p>
                                </div>
                                <div className="text-sm text-muted ml-auto flex items-center gap-3 font-mono">
                                    <UsersIcon height={16} /> {formatNumber(track.entries)}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default TrackSelector;