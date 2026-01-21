"use client";

import ErrorBox from "@/components/global/ErrorBox";
import LoadingBox from "@/components/global/LoadingBox";
import { RouteIcon } from "@/components/icons/RouteIcon";
import { SpeedIcon } from "@/components/icons/SpeedIcon";
import { UsersIcon } from "@/components/icons/UsersIcon";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import LeaderTable from "@/components/leaderboards/LeaderTable";
import TrackSelector from "@/components/leaderboards/TrackSelector";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { ArrowPathRoundedSquareIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { use, useEffect } from "react";

export default function TrackLeaderboard({ params }: { params: Promise<{ trackName: string }>}) {

    const { trackName } = use(params);
    
    // eslint-disable-next-line
    const { error, tracks, current, setCurrent, perfIndex, loading, setPerfIndex, setError }:TracksContextTypes = useTracksContext();

    useEffect(() => {
        if (!tracks) {
            return;
        }

        let currentTrack:TracksTypes|null = null;

        tracks.forEach((track:TracksTypes) => {
            if (track.short_name.toLowerCase() == trackName.toLowerCase()) {
                currentTrack = track;
                
            }
        });

        if (!currentTrack) {
            setError("Invalid track")
            return;
        }
        
        setCurrent(currentTrack);

        return () => {
            setCurrent(undefined);
            setError(undefined);
        }
    }, // eslint-disable-next-line
    [ tracks ]);

    if (error) 
        return (<ErrorBox message={error}/>);

    if (loading) {
        return <LoadingBox message="Fetching track data"/>
    }

    if (!current) {
        return null;
    }

    return(
        <>
            <PageHeader>
                <>
                <div className="relative max-w-full text-start">

                    <div className="flex gap-2 font-bold mb-3 w-full text-nowrap flex-wrap text-xs lg:text-sm">
                        <div className="bg-warning/20 border-2 border-warning/20 text-warning py-1 px-2 rounded-lg">
                            Medium
                        </div>

                        {current.favorite && 
                        <div className="bg-info/10 border-2 border-info/10 py-1 px-2 rounded-lg">
                            Top Track
                        </div>}

                        {current.Game?.symbol == "FH5" && 
                        <div className="flex gap-2 lg:ml-auto bg-black/20 border-2 border-border py-1 px-2 rounded-lg items-center">
                            <p className="text-info font-black">FORZA</p>
                            <p className="text-white/60">HORIZON 5</p>
                        </div>}

                        {current.Game?.symbol == "FH6" && 
                        <div className="flex gap-2 lg:ml-auto bg-black/20 border-2 border-border py-1 px-2 rounded-lg items-center">
                            <p className="text-info font-black">FORZA</p>
                            <p className="text-white/60">HORIZON 6</p>
                        </div>}

                        
                    </div>
                    
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5">

                        <div>
                            <p className="text-3xl lg:text-6xl font-bold mb-3">{current.name} Circuit</p>
                            <p className="text-white/60 mb-5">Compete for the highest drift scores on this legendary drift circuit.</p>
                        </div>
                        <div>
                            <TrackSelector/>
                        </div>
                    </div>
                            
                    <div className="flex gap-5 flex-col md:flex-row">
                        <div>
                            <div className="flex gap-5">
                                <div className="flex items-center gap-3 text-info">
                                    <RouteIcon height={18}  strokeWidth={2}/>
                                    <p className="text-muted">{current.length}mi</p>
                                </div>

                                <div className="w-[1px] bg-border"></div>

                                <div className="flex items-center gap-3 text-info">
                                    <UsersIcon height={18} strokeWidth={2}/>
                                    <p className="text-muted">{current.user_count}</p>
                                </div>

                                <div className="flex items-center gap-3 text-info">
                                    <Square3Stack3DIcon height={18} strokeWidth={1.5}/>
                                    <p className="text-muted">{current.entries}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-[1px] bg-border hidden md:inline-block"></div>

                        <div>
                            <button onClick={() => setPerfIndex(perfIndex == "a" ? "s1" : "a")} 
                                className="flex items-center gap-3 text-info relative">
                                <SpeedIcon height={18} strokeWidth={2}/>
                                <div className="text-white flex items-center gap-2">
                                    {perfIndex.toUpperCase()}-{perfIndex == "a" ? 800 : 900}
                                    <ArrowPathRoundedSquareIcon height={16} className="text-white/60 inline-block" strokeWidth={1.5}/>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                </div>
                </>
            </PageHeader>

            <Container>
                <div className="pb-20">
                    <LeaderTable/>
                </div>
            </Container>
            
        </>
    )

}