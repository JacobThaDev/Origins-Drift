"use client";

import Image from "next/image";
import Container from "../layout/Container";
import { useState } from "react";
import { TracksTypes } from "@/utils/types/TracksTypes";
import Link from "next/link";
import { TropyIcon } from "../icons/TrophyIcon";
import Meteors from "../misc/Meteors";
import { SparklesIcon } from '@heroicons/react/24/solid'
import { useTracksContext } from "@/providers/TracksProvider";

const TracksSection = () => {

    const { tracks } = useTracksContext();
    const [ showAll, setShowAll ] = useState<boolean>(false);

    return(
        <div className="w-full py-20 relative z-[1] mb-10">
            <Container>
                <div className="flex items-center gap-5 mb-7">
                    <p className="font-bold text-2xl">
                        Leaderboards
                    </p>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-10">
                    {tracks && tracks.map((track:TracksTypes, index:number) => {
                        if (!showAll && index > 5) {
                            return null;
                        }

                        return(
                            <div className="h-full bg-card rounded-2xl relative overflow-hidden transition-all duration-500" key={index}>
                                {track.favorite && 
                                <div className="absolute top-0 left-0 z-[4] bg-black/20 backdrop-blur flex gap-2 items-center px-4 pe-5 py-2 rounded-br-2xl">
                                    <SparklesIcon height={20} className="text-info" />
                                    <p className="text-sm font-bold">
                                        Top Track
                                    </p>
                                </div>}
                                <Image 
                                    src={track.track_image} 
                                    width={1920}
                                    height={1080}
                                    alt=""
                                    className={`rounded-2xl h-auto w-full relative hover:z-[1] transition-all duration-[450ms]`}/>

                                <div className="p-3 pb-1.5">
                                    <Link 
                                        href={`/track/${track.short_name}`}
                                        className="relative overflow-hidden inline-block text-center bg-button hover:bg-buttonHover group w-full py-3 rounded-xl transition-all duration-500">
                                        <Meteors className="hidden group-hover:inline-block"/>
                                        <TropyIcon 
                                            height={80}
                                            className="absolute -top-3 right-3 rotate-[-15deg] text-white/5 group-hover:text-warning/20 transition-all duration-500"/>
                                        
                                        <p className="text-white transition-all duration-500">
                                            Leaderboard
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button onClick={() => setShowAll((prev => !prev))}
                        className="bg-card hover:brightness-110 w-full py-5 rounded-2xl">
                    {showAll ? "Hide" : "Show All"} Tracks
                </button>
            </Container>
        </div>
    )
}

export default TracksSection;