"use client"

import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const GameSelector = () => {
    
    const { game, setGame }:TracksContextTypes = useTracksContext();

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
                    onClick={() => setMenuOpen(prev => !prev)} id="track-dropdown-button">
                    <div className="">
                        <p className="text-xs text-muted">Select Game</p>
                        <p>
                            { game == "FH4" ? "Forza Horizon 4" :
                            game == "FH5" ? "Forza Horizon 5":
                            "Forza Horizon 6"}
                        </p>
                    </div>
                    <ChevronDownIcon height={18} 
                        className="text-white/60 inline-block ml-auto" strokeWidth={1.5}/>
                </button>

                <div className={`absolute rounded-xl top-full mt-3 w-full bg-card ${menuOpen ? "flex" : "hidden"} flex-col max-h-[220px] overflow-hidden overflow-y-auto scrollbar z-[50] shadow-xl shadow-black/30`} id="track-dropdown">
                    <button
                        onClick={() => { setGame("FH4"); setMenuOpen(false) }}
                        className={`flex w-full items-center gap-3 hover:bg-secondary px-5 py-2 ${game == "FH4" ? "!bg-info/10" : ""}`} >
                        <div className="text-start">
                            <p className="text-xs text-white/70">
                                Xbox / PC
                            </p>
                            <p>Forza Horizon 4</p>
                        </div>
                    </button>

                     <button
                        onClick={() => { setGame("FH5"); setMenuOpen(false) }}
                        className={`flex w-full items-center gap-3 hover:bg-secondary px-5 py-2 ${game == "FH5" ? "!bg-info/10" : ""}`} >
                        <div className="text-start">
                            <p className="text-xs text-white/70">
                                Xbox / PC
                            </p>
                            <p>Forza Horizon 5</p>
                        </div>
                    </button>

                     <button
                        onClick={() => { setGame("FH6"); setMenuOpen(false) }}
                        className={`flex w-full items-center gap-3 hover:bg-secondary px-5 py-2 ${game == "FH6" ? "!bg-info/10" : ""}`} >
                        <div className="text-start">
                            <p className="text-xs text-white/70">
                                Console / PC
                            </p>
                            <p>Forza Horizon 6</p>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default GameSelector;