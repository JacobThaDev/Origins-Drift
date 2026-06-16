"use client";

import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ClassDropdown = ({ currentClass } : { currentClass: "b"|"a"|"s1" }) => {


    const { 
        loading, perfIndex
    }:TracksContextTypes = useTracksContext();

    const [ open, setOpen ] = useState<boolean>(false);
    const [ mounted, setMounted ] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    const toggleMenu = () => {
        setOpen((prev) => !prev);
    }

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
            setOpen(false);
        }
    }

    return(
        <>
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => toggleMenu()} 
                    className="bg-button px-6 py-4 rounded-lg flex items-center gap-4 relative w-full">
                <p className="text-muted">Class</p>
                <span className={`font-bold ${currentClass == "b" ? "text-warning" : (currentClass == "a" ? "text-danger" : "text-purple")}`}>
                    {currentClass.toUpperCase() +" - "+ (currentClass == "b" ? 600 : (currentClass == "a" ? "700" : "800"))}
                </span>
            </button>

            {open && (
            <div className="absolute top-full w-full bg-button mt-1 rounded-lg left-0 overflow-hidden text-center p-2 z-[1000]">

                <Link href="/leaderboards/b">
                    <div className={`flex items-center px-4 py-2 hover:bg-buttonHover gap-3`}>
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <span>B - 600</span>
                    </div>
                </Link>

                <Link href="/leaderboards/a">
                    <div className={`flex items-center px-4 py-2 hover:bg-buttonHover gap-3`}>
                        <div className="w-3 h-3 bg-danger rounded-full"></div>
                        A - 700
                    </div>
                </Link>

                <Link href="/leaderboards/s1">
                    <div className={`flex items-center px-4 py-2 hover:bg-buttonHover gap-3`}>
                        <div className="w-3 h-3 bg-purple rounded-full"></div>
                        S1 - 800
                    </div>
                </Link>
            </div>)}

        </div>
        </>
    )
}

export default ClassDropdown;