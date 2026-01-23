
"use client"

import LoadingBox from "@/components/global/LoadingBox";
import { SpeedIcon } from "@/components/icons/SpeedIcon";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import GameSelector from "@/components/leaderboards/GameSelector";
import TracksList from "@/components/leaderboards/TracksList";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

export default function Leaderboards() {

    const { 
        tracks, loading, game, perfIndex, setPerfIndex
    }:TracksContextTypes = useTracksContext();
    
    if (loading && !tracks) {
        return <LoadingBox message="Loading tracks"/>
    }

    const gameTracks = tracks.filter((track:TracksTypes) => track.Game.symbol == game)

    return (
        <>
            <PageHeader>
                <>
                <div className="relative max-w-full text-start">
                    <div className="flex flex-col-reverse lg:flex-row justify-between lg:items-center">
                        <div>
                            <p className="text-3xl lg:text-6xl font-bold mb-3">
                                Leaderboards
                            </p>
                            <p className="text-white/60 mb-8">
                                Submit your best drift scores and climb the rankings. Each track
                                offers unique<br/>challenges for every skill level.
                            </p>

                            <button onClick={() => setPerfIndex(perfIndex == "a" ? "s1" : "a")} 
                                className="flex items-center gap-3 text-info relative mb-5 lg:mb-0">
                                <SpeedIcon height={18} strokeWidth={2}/>
                                <div className="text-white flex items-center gap-2">
                                    {perfIndex.toUpperCase()}-{perfIndex == "a" ? 800 : 900}
                                    <ArrowPathRoundedSquareIcon height={16} 
                                        className="text-white/60 inline-block" 
                                        strokeWidth={1.5}/>
                                </div>
                            </button>
                        </div>
                        <div className="mb-5 lg:mb-0">
                            <GameSelector/>
                        </div>
                    </div>
                </div>
                </>
            </PageHeader>

            <div className="pb-24">
                <Container>
                    <p className="text-2xl md:text-3xl font-bold mb-10">
                        {game == "FH4" ? "Forza Horizon 4" : 
                        game == "FH5" ? "Forza Horizon 5" : 
                        "Forza Horizon 6"} Tracks
                    </p>

                    <TracksList tracks={gameTracks} showButton={false} />
                </Container>
            </div>
        </>
    );

}