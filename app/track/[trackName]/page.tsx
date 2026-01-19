"use client";

import { RouteIcon } from "@/components/icons/RouteIcon";
import { SpeedIcon } from "@/components/icons/SpeedIcon";
import { UsersIcon } from "@/components/icons/UsersIcon";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import LeaderTable from "@/components/leaderboards/LeaderTable";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { use, useEffect } from "react";

export default function TrackLeaderboard({ params }: { params: Promise<{ trackName: string }>}) {

    const { trackName } = use(params);
    
    // eslint-disable-next-line
    const { tracks, current, setCurrent, perfIndex, setLeaderboard, setError }:TracksContextTypes = useTracksContext();

    useEffect(() => {
        if (!tracks) {
            return;
        }

        tracks.forEach((track:TracksTypes) => {
            if (track.short_name.toLowerCase() == trackName.toLowerCase()) {
                setCurrent(track);
            }
        });

         return () => {
            //setCurrent(undefined);
            //setLeaderboard(undefined);
            //setError(undefined);
        }
    }, // eslint-disable-next-line
    [ tracks ]);

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
                    </div>

                    <p className="text-3xl lg:text-6xl font-bold mb-3">{current.name} Circuit</p>
                    <p className="text-white/60 mb-5">Compete for the highest drift scores on this legendary drift circuit.</p>
                            
                    <div className="flex gap-5">
                        <div className="flex items-center gap-3 text-info">
                            <RouteIcon height={18}  strokeWidth={2}/>
                            <p className="text-white/60">{current.length}mi</p>
                        </div>

                        <div className="w-[1px] bg-border"></div>

                        <div className="flex items-center gap-3 text-info">
                            <UsersIcon height={18} strokeWidth={2}/>
                            <p className="text-white/60">{current.user_count}</p>
                        </div>

                        <div className="w-[1px] bg-border"></div>

                         <button onClick={() => {}} className="flex items-center gap-3 text-info relative">
                            <SpeedIcon height={18} strokeWidth={2}/>
                            <p className="text-white flex items-center gap-1">
                                {perfIndex.toUpperCase()}-{perfIndex == "a" ? 800 : 900}
                                <ChevronDownIcon height={20} className="text-white/60 inline-block" strokeWidth={2}/>
                            </p>
                        </button>
                    </div>
                </div>
                </>
            </PageHeader>

            <Container>
                <LeaderTable/>
            </Container>
            
        </>
    )

    //const { tracks, activeTrack, setActiveTrack }:TracksContextTypes = useTracksContext();

    /*useEffect(() => {
        if (!tracks) {
            return;
        }
        
        tracks.map((track:TracksTypes) => {
            if (track.short_name == trackName)
                setActiveTrack(track);
        });
        
        // reset active track when leaving the page.
        return () => setActiveTrack(undefined);
    },// eslint-disable-next-line  
    [tracks]);*

    if (!activeTrack) {
        return null;
    }

    return (
        <>
            <TrackHeader/>

            <div className="py-16">
                <Container>

                    <div className="flex gap-3 flex-col lg:flex-row">
                        <Image 
                            src={activeTrack.track_image} 
                            className="rounded-xl lg:hidden"
                            width={950} 
                            height={150} alt=""/>

                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-col lg:flex-row items-center gap-3">
                                <ClassSelector />
                                <div className="w-full lg:max-w-[300px]">
                                    <TrackSelector/>
                                </div>
                            </div>
                            <LeaderTable />
                        </div>

                        <div className="flex flex-col gap-3 w-full lg:max-w-[350px] lg:min-w-[350px] relative">
                            <Image 
                                src={activeTrack.track_image} 
                                className="rounded-xl hidden lg:inline-block"
                                width={950} 
                                height={150} alt=""/>
                            <RecentEntries/>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );*/

}