"use client";

import { LoadingIcon } from "@/components/icons/LoadingIcon";
import Container from "@/components/layout/Container";
import ClassSelector from "@/components/leaderboards/ClassSelector";
import LeaderTable from "@/components/leaderboards/LeaderTable";
import SubmitButton from "@/components/leaderboards/SubmitButton";
import TrackHeader from "@/components/leaderboards/TrackHeader";
import { useLeaderboardContext } from "@/providers/LeaderboardProvider";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { ChartBarIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function TrackLeaderboard({ params }: { params: Promise<{ trackName: string }>}) {

    const { trackName } = use(params);
    const { tracks, activeTrack, setActiveTrack }:TracksContextTypes = useTracksContext();
    const [ showTracks, setShowTracks ] = useState<boolean>(false);
    const { loading } = useLeaderboardContext();

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

            <div className="py-16">
                <Container>

                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="w-full">
                            <div className="flex items-center mb-3 gap-3">
                                <p className="text-2xl font-bold ">Leaderboard - Top 50</p>
                                <div className="flex gap-3 justify-end items-center ml-auto">
                                    <p>Class</p>
                                    <ClassSelector />
                                </div>
                                <div>
                                    <SubmitButton/>
                                </div>
                            </div>
                            <LeaderTable />
                        </div>

                        <div className="w-full lg:max-w-[350px] relative">
                            <Image src={activeTrack.track_image} 
                                className="rounded-2xl mb-5"
                                width={950} 
                                height={150} alt=""/>

                            <div className="bg-card rounded-2xl p-5">
                                <p className="mb-5">Other Tracks</p>
                                {<div className="w-full flex flex-col gap-1">
                                    {tracks && tracks.map((track:TracksTypes, index:number) => {
                                        return(
                                            <button key={index} 
                                                className={`flex items-center gap-3 bg-button hover:bg-buttonHover px-5 py-2 rounded-md ${activeTrack == track ? "!bg-infodark" : ""}`} onClick={() => setActiveTrack(track)}>
                                                <p>{track.name}</p>
                                                <p className="text-sm text-white/70 ml-auto">{track.length} mi</p>
                                            </button>
                                        )
                                    })}
                                </div>}
                            </div>
                        </div>
                        
                    </div>

                    {/* <div className="flex flex-col lg:flex-row gap-7 items-start mt-[-80px] relative">
                        <div className="lg:min-w-[350px] relative mt-[-20px]">

                            <div className="bg-card rounded-2xl mb-3">
                                <Image src={activeTrack.track_image} 
                                    className="rounded-2xl"
                                    width={450} 
                                    height={150} alt=""/>
                                {showTracks && <div className="w-full flex flex-col gap-1 p-5">
                                    {tracks && tracks.map((track:TracksTypes, index:number) => {
                                        return(
                                            <button key={index} 
                                                className={`flex items-center gap-3 bg-button hover:bg-buttonHover px-5 py-2 rounded-md ${activeTrack == track ? "!bg-infodark" : ""}`} onClick={() => setActiveTrack(track)}>
                                                <p>{track.name}</p>
                                                <p className="text-sm text-white/70 ml-auto">{track.length} mi</p>
                                            </button>
                                        )
                                    })}
                                </div>}
                                <div className="px-5 py-5">
                                    <button className="rounded-lg bg-button hover:bg-buttonHover w-full px-5 py-3" 
                                    onClick={() => setShowTracks(!showTracks)}>
                                        {showTracks ? "Hide" : "Show" } Tracks
                                    </button>
                                </div>
                            </div>
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
                    </div> */}
                </Container>
            </div>
        </>
    );

}