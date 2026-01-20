"use client";

import Image from "next/image";
import { useState } from "react";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { SparklesIcon } from '@heroicons/react/24/solid'
import { useTracksContext } from "@/providers/TracksProvider";
import { ChevronRightIcon, TrophyIcon} from "@heroicons/react/24/outline";
import { formatNumber } from "@/utils/Functions";
import { UsersIcon } from "../icons/UsersIcon";
import Link from "next/link";

const TracksSection = () => {

    const { tracks } = useTracksContext();
    const [ showAll, setShowAll ] = useState<boolean>(false);

    return(
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-10">
                {tracks && tracks.map((track:TracksTypes, index:number) => {
                    if (!showAll && index > 5) {
                        return null;
                    }

                    return(
                        <div className="h-full bg-card rounded-2xl relative overflow-hidden transition-all duration-300 border-2 border-border hover:border-info/30" key={index}>
                            
                            <div className="absolute top-2 left-2 flex items-center z-[2] gap-3 right-2">
                                {track.favorite && 
                                <div className="bg-card/40 backdrop-blur flex gap-2 items-center px-4 pe-5 py-2 rounded-xl">
                                    <SparklesIcon height={20} className="text-info" />
                                    <p className="text-sm font-bold">
                                        Top Track
                                    </p>
                                </div>}
                            </div>

                            <div className="h-[170px] rounded-2xl flex items-end px-7 pb-3 relative">
                                <Image 
                                    src={"/img/tracks/headers/"+track.short_name+".jpg"} 
                                    width={1920}
                                    height={1080}
                                    alt=""
                                    className={`absolute rounded-2xl h-auto w-full bottom-0 left-0 opacity-40`}/>
                                <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-card"/>
                                
                                <div className="relative flex justify-between items-center w-full">
                                    <p className="text-2xl font-bold">
                                        {track.name} Circuit
                                    </p>
                                    <p className="font-mono text-info text-lg font-bold">
                                        {track.length}mi
                                    </p>
                                </div>
                            </div>

                            <div className="p-7 pt-1">
                                <div className="flex items-center gap-5">
                                    <div className="flex items-center gap-2">
                                        <TrophyIcon height={20} className="text-warning" />
                                        <span className="font-bold">{!track.top_score ? 0 : formatNumber(track.top_score)}</span>
                                    </div>
                                    <div className="flex items-center text-white/60 gap-3">
                                        <UsersIcon strokeWidth={2} height={20}/>
                                        <p>{track.user_count}</p>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                    <Link href={`/track/${track.short_name}`} className="px-3 py-2 text-info rounded-md hover:bg-info hover:text-black font-bold transition-all duration-300 flex items-center gap-5">
                                        Leaderboard
                                        <ChevronRightIcon height={20}/>
                                    </Link> 
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button onClick={() => setShowAll((prev => !prev))}
                    className="bg-card hover:brightness-110 w-full py-5 rounded-2xl">
                {showAll ? "Hide" : "Show All"} Tracks
            </button>
        </>
    )
}

export default TracksSection;