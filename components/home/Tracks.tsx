"use client";

import Image from "next/image";
import Container from "../layout/Container";
import { useState } from "react";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { BookmarkIcon } from "../icons/BookmarkIcon";
import Link from "next/link";

const TracksSection = ({ tracks }: { tracks:TracksTypes[] }) => {

    const [ showAll, setShowAll ] = useState<boolean>(false);

    return(
        <div className="w-full py-20 relative z-[1] mb-10">
            <Container>
                <div className="flex items-center gap-5 mb-7">
                    <p className="font-bold text-2xl">
                        Leaderboards
                    </p>

                    {/* <div className="flex rounded items-center overflow-hidden bg-danger font-black text-sm">
                        <div className="w-[38px] text-center">
                            A
                        </div>
                        <div className="text-center border-danger border-2 border-l-0 bg-white h-full flex items-center justify-center text-black w-[48px] rounded-r">
                            800
                        </div>
                    </div>

                    <div className="flex rounded items-center overflow-hidden bg-[#69459C] font-black text-sm">
                        <div className="w-[38px] text-center">
                            S1
                        </div>
                        <div className="text-center border-[#69459C] border-2 border-l-0 bg-white h-full flex items-center justify-center text-black w-[48px] rounded-r">
                            900
                        </div>
                    </div> */}
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-10 group">
                    {tracks && tracks.map((track:TracksTypes, index:number) => {
                        if (!showAll && index > 5) {
                            return null;
                        }

                        return(
                            <div className="h-full bg-card rounded-2xl relative overflow-hidden transition-all duration-500" key={index}>
                                {track.favorite && 
                                <div className="absolute top-0 left-0 z-[4] bg-info/50 flex gap-2 items-center px-4 pe-5 py-2 rounded-br-2xl">
                                    <BookmarkIcon height={20} className="text-info" />
                                    <p className="text-sm font-bold">Top Track</p>
                                </div>}
                                <Image 
                                    src={track.track_image} 
                                    width={1920}
                                    height={1080}
                                    alt=""
                                    className={`rounded-2xl h-auto w-full relative hover:z-[1] transition-all duration-[450ms]`}/>

                                <div className="p-3">
                                    <Link href={`/track/${track.short_name}`}
                                            className="inline-block text-center bg-card brightness-110 hover:brightness-125 w-full py-3 rounded-xl">
                                        Leaderboard
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