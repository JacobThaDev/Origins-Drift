
"use client"

import LoadingBox from "@/components/global/LoadingBox";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import TracksList from "@/components/leaderboards/TracksList";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";

export default function Leaderboards() {

    const { 
        tracks, loading, game, setGame, perfIndex, setPerfIndex
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
                            <p className="text-white/60">
                                Submit your best drift scores and climb the rankings. Each track
                                offers unique<br/>challenges for every skill level.
                            </p>
                        </div>
                    </div>
                </div>
                </>
            </PageHeader>

            <div className="pb-24">
                <Container>

                    <div className="flex flex-col lg:flex-row md:justify-between justify-center lg:items-center mb-10">
                        <p className="text-2xl md:text-3xl font-bold mb-5 lg:mb-0">
                            {game == "FH5" 
                                ? "Forza Horizon 5" 
                                : "Forza Horizon 6"} Tracks
                        </p>

                        <div className="flex flex-row items-center gap-4">
                            <button 
                                onClick={() => setGame(game == "FH5" ? "FH6" : "FH5")} 
                                className="inline-flex items-center rounded-xl bg-card p-2 border-2 border-border font-bold">
                                
                                <p className="px-5 text-sm text-muted hidden md:inline-block">Game</p>
                                
                                <div className={`${game == "FH5" && "bg-info/20"} w-14 py-2 rounded-lg`}>
                                    FH5
                                </div>
                                <div className={`${game == "FH6" && "bg-info/20"} w-14 py-2 rounded-lg`}>
                                    FH6
                                </div>
                            </button>

                            <button onClick={() => setPerfIndex(perfIndex == "a" ? "s1" : "a")}
                                    className="inline-flex items-center rounded-xl bg-card p-2 border-2 border-border font-bold">
                                
                                <p className="px-5 text-sm text-muted hidden md:inline-block">Class</p>
                                
                                <div className={`${perfIndex == "a" && "bg-danger text-white"} w-14 py-2 rounded-lg`}>
                                    A
                                </div>
                                <div className={`${perfIndex == "s1" && "bg-lightPurple text-white"} w-14 py-2 rounded-lg`}>
                                    S1
                                </div>
                            </button>
                        </div>
                    </div>

                    <TracksList tracks={gameTracks} showButton={false} />
                </Container>
            </div>
        </>
    );

}