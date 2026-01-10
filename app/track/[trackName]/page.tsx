"use client";

import Container from "@/components/layout/Container";
import ClassSelector from "@/components/leaderboards/ClassSelector";
import LeaderTable from "@/components/leaderboards/LeaderTable";
import SubmitButton from "@/components/leaderboards/SubmitButton";
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

                    <div className="flex gap-5 flex-col-reverse lg:flex-row">
                        <div className="w-full">
                            <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center mb-3 gap-3">
                                <p className="text-2xl font-bold ">Leaderboard - Top 50</p>
                                <div className="flex gap-3 justify-end items-center">
                                    <p>Class</p>
                                    <ClassSelector />
                                </div>
                            </div>
                            <LeaderTable />
                        </div>

                        <div className="w-full lg:max-w-[350px] lg:min-w-[350px] relative">
                            <Image src={activeTrack.track_image} 
                                className="rounded-2xl mb-3"
                                width={950} 
                                height={150} alt=""/>

                            <SubmitButton/>
                            <TrackSelector/>
                        </div>
                    </div>

                    {/* <div className="flex flex-col-reverse lg:flex-row gap-5">
                        <div className="w-full">
                            <div className="flex items-center mb-3 gap-3">
                                <p className="text-2xl font-bold ">Leaderboard - Top 50</p>
                                <div className="flex gap-3 justify-end items-center ml-auto">
                                    <p>Class</p>
                                    <ClassSelector />
                                </div>
                            </div>
                            <LeaderTable />
                        </div>

                        <div className="w-full lg:max-w-[350px] relative">
                            <Image src={activeTrack.track_image} 
                                className="rounded-2xl mb-3"
                                width={950} 
                                height={150} alt=""/>

                            <SubmitButton/>
                            <TrackSelector/>
                        </div>
                    </div> */}
                </Container>
            </div>
        </>
    );

}