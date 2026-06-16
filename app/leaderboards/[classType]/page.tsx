"use client";

import LoadingBox from "@/components/global/LoadingBox";
import { LoadingIcon } from "@/components/icons/LoadingIcon";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import ClassDropdown from "@/components/leaderboards/ClassDropdown";
import TrackList from "@/components/leaderboards/TrackList";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { use, useEffect, useState } from "react";

type ProfileTypes = {
    params: Promise<{ classType: "b"|"a"|"s1" }>
}

export default function ClassLeaderboard({ params }: ProfileTypes) {
    
    const [ mounted, setMounted ] = useState<boolean>();
    const { classType }: { classType: "b"|"a"|"s1" } = use(params);

    const { 
        tracks, loading, game, loadTracks
    }:TracksContextTypes = useTracksContext();
     
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function load() {
            loadTracks(classType, true);
        }

        load();
    },// eslint-disable-next-line 
    [mounted]);

    
    if (loading && !tracks) {
        return <LoadingBox message="Loading tracks"/>
    }

    const gameTracks = tracks.filter((track:TracksTypes) => track.Game.symbol == game)

    return (
        <>
            <PageHeader>
                <div className="relative max-w-full text-start">
                    <div className="flex flex-col-reverse lg:flex-row justify-between lg:items-center">
                        <div>
                            <p className="text-3xl lg:text-6xl font-bold mb-3">
                                Leaderboards
                            </p>
                            <p className="text-white/60">
                                Submit your best drift scores and climb the rankings. Each track
                                offers unique<br/>challenges for every skill level.
                            </p>
                        </div>
                    </div>
                </div>
            </PageHeader>

            <div className="pb-24">
                <Container>
                    <div className="flex flex-col lg:flex-row items-center gap-4 mb-10">

                        <div className="bg-button px-6 py-4 rounded-lg inline-flex w-full lg:w-auto text-nowrap gap-4 ">
                            <p className="text-muted">Game</p>
                            {game == "FH5" ? "Horizon 5" : "Horizon 6"}
                        </div>
                        <div className="w-full lg:w-auto text-nowrap">
                            <ClassDropdown currentClass={classType}/>
                        </div>
                        {loading && <LoadingIcon height={20}/>}
                    </div>

                    <TrackList tracks={gameTracks} classType={classType}/>
                </Container>
            </div>
        </>
    );
}