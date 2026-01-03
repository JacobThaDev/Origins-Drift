"use client";

import Container from "@/components/layout/Container";
import LeaderTable from "@/components/leaderboards/LeaderTable";
import TrackHeader from "@/components/leaderboards/TrackHeader";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import Image from "next/image";
import { use, useEffect } from "react";

export default function TrackLeaderboard({ params }: { params: Promise<{ trackName: string }>}) {

    const { trackName } = use(params);
    const { tracks, activeTrack, setActiveTrack }:TracksContextTypes = useTracksContext();
    
    useEffect(() => {
        if (!tracks) {
            return;
        }
        
        tracks.map((track:TracksTypes) => {
            if (track.short_name == trackName)
                setActiveTrack(track);
        });
        
        // reset active track when leaving the page.
        return () => setActiveTrack(undefined);
    }, [tracks]);

    if (!activeTrack) {
        return null;
    }

    return (
        <>
            <TrackHeader/>

            <div className="pb-16">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-7 items-start mt-[-80px] relative">
                        <div className="bg-card rounded-2xl relative mt-[-20px] p-1 lg:min-w-[450px]">
                            <Image src={activeTrack.track_image} 
                                className="rounded-xl" width={450} height={150} alt=""/>
                        </div>

                        <div className="w-full">
                            <div className="mb-3 lg:mb-12">
                                <p className="text-2xl lg:text-4xl font-bold">
                                    Leaderboard
                                </p>
                                <p>Top 100</p>
                            </div>
                            <LeaderTable />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );

}