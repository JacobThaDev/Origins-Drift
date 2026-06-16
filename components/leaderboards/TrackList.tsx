import { formatNumber } from "@/utils/Functions";
import { TracksTypes } from "@/utils/types/TracksTypes";
import Image from "next/image";
import Link from "next/link";
import { TrophyIcon } from "../icons/TrophyIcon";

const TrackList = ({ tracks, classType } : TracksListTypes) => {
    
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {tracks?.map((track:TracksTypes, index:number) => {
                    return(
                        <div className="group" key={index}>
                            <div className="relative w-full bg-card rounded-xl overflow-hidden group-hover:border-info/50 shadow-black/50 shadow-lg">
                                <Image src={"/img/tracks/"+track.short_name+".png"} 
                                    width={1920}
                                    height={1080}
                                    alt=""
                                    className={`h-auto w-full`}/>
                               

                                <div className="flex gap-5 flex-row items-center relative px-6 py-5">
                                    <TrophyIcon height={30} className="text-warning hidden lg:inline-block"/>
                                    <div className="lg:w-[100px]">
                                        <p className="text-muted text-xs mb-1 font-mono ">
                                            Top Score
                                        </p>
                                        
                                        <p className="font-bold text-info">
                                            {track.Scores.length > 0 && formatNumber(track.Scores[0].score) || 0}
                                        </p>
                                    </div>

                                    <div className="w-[1px] h-[50px] bg-secondary"/>

                                    <div className="">
                                        <p className="text-muted text-xs mb-1 font-mono">
                                            Drifter
                                        </p>
                                        <p className="font-bold ">
                                            { track.Scores.length > 0 && track.Scores[0].User?.name || "-"}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="pb-6 px-6">
                                   <Link href={`/leaderboards/${classType}/${track.short_name}`}>
                                        <div className="bg-button hover:bg-buttonHover transition-all w-full py-3 rounded-lg text-center">
                                            View Leaderboard
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

interface TracksListTypes {
    tracks: TracksTypes[]|undefined;
    classType: "b"|"a"|"s1";
}

export default TrackList;