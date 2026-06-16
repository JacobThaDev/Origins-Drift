"use client";

import { RouteIcon } from "@/components/icons/RouteIcon";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import ClassButton from "@/components/leaderboards/ClassButton";
import Leaderboard from "@/components/leaderboards/Leaderboard";
import TrackSelector from "@/components/leaderboards/TrackSelector";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { use, useEffect, useState } from "react";

type ProfileTypes = {
    params: Promise<{ classType: "b"|"a"|"s1", track:string }>
}

export default function TrackLeaderboard({ params }: ProfileTypes) {
    
    const { track, classType }: { track:string; classType: "b"|"a"|"s1" } = use(params);
    const { tracks, current, setCurrent, loadTracks }:TracksContextTypes = useTracksContext();

    const [ mounted, setMounted ] = useState<boolean>();
     
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }
        loadTracks(classType, true);
    },// eslint-disable-next-line 
    [mounted]);

    
    useEffect(() => {
        if (!tracks) {
            loadTracks(classType, true);
            return;
        }

        tracks.forEach((trackInfo:TracksTypes) => {
            if (trackInfo.short_name.toLowerCase() == track.toLowerCase()) {
                setCurrent(trackInfo);
            }
        });
    }, // eslint-disable-next-line 
    [ tracks, track ]);

    return (
        <>
        <PageHeader>
            <>
            <div className="relative max-w-full text-start">

                <div className="flex gap-2 font-bold mb-3 w-full text-nowrap flex-wrap text-xs lg:text-sm">
                    <div className="bg-warning/20 border-2 border-warning/20 text-warning py-1 px-2 rounded-lg">
                        Medium
                    </div>

                    {current?.favorite && 
                    <div className="bg-info/10 border-2 border-info/10 py-1 px-2 rounded-lg">
                        Top Track
                    </div>}

                    {current?.Game?.symbol == "FH5" && 
                    <div className="flex gap-2 lg:ml-auto bg-black/20 border-2 border-border py-1 px-2 rounded-lg items-center">
                        <p className="text-info font-black">FORZA</p>
                        <p className="text-white/60">HORIZON 5</p>
                    </div>}

                    {current?.Game?.symbol == "FH6" && 
                    <div className="flex gap-2 lg:ml-auto bg-black/20 border-2 border-border py-1 px-2 rounded-lg items-center">
                        <p className="text-info font-black">FORZA</p>
                        <p className="text-white/60">HORIZON 6</p>
                    </div>}
                </div>
                
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5">
                    <div>
                        <p className="text-3xl lg:text-6xl font-bold mb-3">{current?.name} Circuit</p>
                        <p className="text-white/60 mb-5">Compete for the highest drift scores on this legendary drift circuit.</p>
                    </div>
                    <div>
                        <TrackSelector gameId={current ? current.game : 3}/>
                    </div>
                </div>
                        
                <div className="flex gap-5 flex-col md:flex-row">
                    <div>
                        <div className="flex gap-5">

                            <div className="flex items-center gap-3">
                                <MapPinIcon height={18} strokeWidth={2} className="text-muted"/>
                                <p>{current?.Game.symbol == "FH5" ? "Mexico" : "Japan"}</p>
                            </div>

                            <div className="w-[1px] bg-border"></div>

                            <div className="flex items-center gap-3">
                                <RouteIcon height={18} strokeWidth={2} className="text-muted"/>
                                <p>0 mi</p>
                            </div>

                            <div className="w-[1px] bg-border"></div>

                            <ClassButton track={track} classType={classType}/>
                        </div>
                    </div>
                </div>
            </div>
            </>
        </PageHeader>

        <Container>
            <div className="pb-20">
                <Leaderboard track={track} classType={classType}/>
            </div>
        </Container>
        </>
    );
}