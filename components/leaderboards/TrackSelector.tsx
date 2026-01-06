"use client"

import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const TrackSelector = () => {
    
    const { tracks, activeTrack, setActiveTrack }:TracksContextTypes = useTracksContext();
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

    const changeTrack = (track:TracksTypes) => {
        setActiveTrack(track)
        setMenuOpen(false);
    }

    return(
        <>
            <div className="relative mb-3" ref={dropdownRef}>
                <button className="bg-button w-full p-4 py-3 rounded-xl text-start flex items-center"
                    onClick={() => setMenuOpen(!menuOpen)} id="track-dropdown-button">
                    <div>
                        <p className="text-xs text-white/70">Current Track</p>
                        <p>{activeTrack.name} Circuit</p>
                    </div>
                    <ChevronDownIcon height={20} className="ml-auto"/>
                </button>
                
                <div className={`absolute rounded-xl top-full mt-2 w-full bg-button ${menuOpen ? "flex" : "hidden"} flex-col max-h-[220px] overflow-y-scroll scrollbar z-[50]`} id="track-dropdown">
                    {tracks && tracks.map((track:TracksTypes, index:number) => {
                        return(
                            <button key={index} 
                                id="track-button"
                                className={`flex w-full items-center gap-3 hover:bg-buttonHover px-5 py-2 ${activeTrack == track ? "!bg-infodark" : ""}`} 
                                onClick={() => changeTrack(track)}>
                                <div className="text-start">
                                    <p className="text-xs text-white/70" >{track.Game.name}</p>
                                    <p>{track.name}</p>
                                </div>
                                <p className="text-sm text-white/70 ml-auto">{track.length} mi</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default TrackSelector;