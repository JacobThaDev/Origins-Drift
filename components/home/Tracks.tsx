"use client";

import Image from "next/image";
import Container from "../layout/Container";
import { useEffect, useState } from "react";
import LocalApi from "@/services/LocalApi";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { GamesTypes } from "@/utils/types/GamesTypes";
import { ShieldCheckIcon } from "../icons/ShieldCheckIcon";

const TracksSection = () => {

    const [ tracks, setTracks ]   = useState<TracksTypes[]>();
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ showAll, setShowAll ] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function loadTracks() {
            const gamesData:GamesTypes = await LocalApi.get("games/fh5").then(r => r.data);

            if (gamesData != null) {
                const tracks:TracksTypes[] = gamesData.tracks;
                setTracks(tracks);
            }
        }

        loadTracks();

    }, [ mounted ])

    return(
        <div className="w-full py-20 relative z-[1] mb-10">
            <Container>
                <div className="flex items-center gap-5 mb-7">
                    <p className="font-bold text-2xl">
                        Leaderboards
                    </p>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
                    {tracks && tracks.map((track:TracksTypes, index:number) => {
                        if (!showAll && index > 3) {
                            return null;
                        }

                        return(
                            <div className="h-full bg-card rounded-2xl" key={index}>
                                <Image 
                                    unoptimized 
                                    src={track.track_image} 
                                    width={1920}
                                    height={1080}
                                    alt=""
                                    className={`rounded-2xl h-auto w-full group-hover:opacity-50 hover:!opacity-100 hover:!grayscale-0 relative hover:z-[1] transition-all duration-[450ms]`}/>

                                <div className="p-5 px-7">
                                    <div className="flex justify-between gap-3 items-center mb-4">
                                        <p className="text-white/60 text-sm">Top 5 Drifters (A-Class)</p>
                                    </div>

                                    <div className="flex justify-between gap-3 items-center">
                                        <p className="font-bold">MikeSpike83</p>
                                        <div className="flex items-center">
                                            <ShieldCheckIcon height={18} className="text-info" title="verified"/>
                                            <p>950,000</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-3 items-center">
                                        <p className="font-bold">Legit-JP</p>
                                        <p>900,000</p>
                                    </div>
                                    <div className="flex justify-between gap-3 items-center">
                                        <p className="font-bold">Mephistopheles</p>
                                        <p>850,000</p>
                                    </div>
                                    <div className="flex justify-between gap-3 items-center">
                                        <p className="font-bold">CloudsRWD</p>
                                        <p>800,000</p>
                                    </div>
                                    <div className="flex justify-between gap-3 items-center">
                                        <p className="font-bold">JacobThaDev</p>
                                        <p>750,000</p>
                                    </div>
                                </div>
                            </div>
                        )

                        // return(
                        //     <Link href={`/track/${track.short_name}`} className="inline-block w-[150px] h-[150px]" key={index}>
                        //         <Image unoptimized src={track.track_image} width={1920} height={1080} alt=""
                        //             className="h-auto w-[150px] rounded-2xl group-hover:opacity-50 hover:!opacity-100 hover:!grayscale-0 relative hover:z-[1] transition-all duration-[450ms] hover:"/>
                        //     </Link>
                        // )
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