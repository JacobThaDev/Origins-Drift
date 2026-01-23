import { formatNumber } from "@/utils/Functions";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { MapPinIcon, SparklesIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { UsersIcon } from "../icons/UsersIcon";
import Link from "next/link";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { SpeedIcon } from "../icons/SpeedIcon";

const TracksList = ({ tracks, showButton = true, limit = 6 } : TracksListTypes) => {
    

    const [ showAll, setShowAll ] = useState<boolean>(false);
    const { perfIndex, game }:TracksContextTypes = useTracksContext();
    
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tracks?.map((track:TracksTypes, index:number) => {
                    if (showButton && !showAll && index > limit - 1) {
                        return null;
                    }
                    
                    return(
                        <Link href={`/track/${track.short_name}`} className="h-full bg-card rounded-2xl relative overflow-hidden group transition-all duration-300 border-2 border-border hover:border-info/30" key={index}>
                            <div className="absolute bottom-0 w-0 group-hover:w-full transition-all h-1 bg-info"/>
                            
                            <div className="absolute top-2 left-2 flex items-center z-[2] gap-3 right-2">
                                {track.favorite && 
                                <div className="bg-card/40 backdrop-blur flex gap-2 items-center px-4 pe-5 py-2 rounded-xl">
                                    <SparklesIcon height={20} className="text-info" />
                                    <p className="text-sm font-bold">
                                        Top Track
                                    </p>
                                </div>}

                                <div className="ml-auto bg-card/40 backdrop-blur flex gap-2 items-center px-4 pe-5 py-2 rounded-xl">
                                    <SpeedIcon strokeWidth={2} height={20} className="text-info" />
                                    <p className="text-sm font-bold">
                                        {perfIndex.toUpperCase()}-{perfIndex == "a" ? "800" : "900"}
                                    </p>
                                </div>
                            </div>

                            <div className="h-[150px] rounded-2xl flex items-end px-7 pb-3 relative">
                                <Image
                                    src={"/img/tracks/headers/"+track.short_name+".jpg"} 
                                    width={1920}
                                    height={1080}
                                    alt=""
                                    className={`absolute rounded-2xl h-auto w-full bottom-0 left-0 opacity-40 min-h-[150px]`}/>

                                <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-card"/>
                                
                                <div className="relative flex justify-between items-center w-full">
                                    <p className="text-xl md:text-2xl font-bold">
                                        {track.name} Circuit
                                    </p>
                                    <p className="font-mono text-info text-sm font-bold hidden lg:">
                                        {track.length}mi
                                    </p>
                                </div>
                            </div>

                            <div className="p-7 pt-1">

                                <div className="flex items-center gap-5 mb-5 text-sm">
                                    <div className="flex items-center text-muted gap-2">
                                        <MapPinIcon strokeWidth={2} height={18}/>
                                        <p>{game == "FH4" ? "United Kingdom" : game == "FH5" ? "Mexico" : "Japan"}</p>
                                    </div>
                                    <div className="flex items-center text-muted gap-2">
                                        <UsersIcon strokeWidth={2} height={18}/>
                                        <p>{track.user_count}</p>
                                    </div>
                                    <div className="flex items-center text-muted gap-2">
                                        <Square3Stack3DIcon strokeWidth={1.7} height={18}/>
                                        <p>{track.entries}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-muted">
                                    <div>
                                        <p className="mb-1">Top score</p>
                                        <p className="text-info font-mono font-bold text-2xl">
                                            {track.Scores.length > 0 && formatNumber(track.Scores[0].score) || 0}
                                        </p>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-1">By</p>
                                        <p className="text-white font-semibold text-lg">
                                            { track.Scores.length > 0 && track.Scores[0].User?.name || "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {tracks && tracks.length > 0 && showButton && 
            <button onClick={() => setShowAll((prev => !prev))}
                    className="bg-card hover:brightness-110 w-full py-5 rounded-2xl mt-10">
                {showAll ? "Hide" : "Show All"} Tracks
            </button>
            }

            {tracks?.length == 0 && 
            <>
                <div className="border-2 border-warning/30 bg-warning/10 w-full p-6 rounded-xl text-warning">
                    No tracks yet for this game.
                </div> 
            </>}
        </>
    )
}

interface TracksListTypes {
    tracks: TracksTypes[]|undefined;
    showButton?: boolean;
    limit?: number;
}

export default TracksList;