"use client";

import Container from "@/components/layout/Container";
import ClassSelector from "@/components/leaderboards/ClassSelector";
import LeaderTable from "@/components/leaderboards/LeaderTable";
import RecentEntries from "@/components/leaderboards/RecentEntries";
import TrackHeader from "@/components/leaderboards/TrackHeader";
import TrackSelector from "@/components/leaderboards/TrackSelector";
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
    },// eslint-disable-next-line  
    [tracks]);

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
    );

}