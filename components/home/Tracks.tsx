"use client";

import { useTracksContext } from "@/providers/TracksProvider";
import TracksList from "../leaderboards/TracksList";
import { TracksTypes } from "@/utils/types/TracksTypes";
import ClassButton from "../leaderboards/ClassButton";

const TracksSection = () => {

    const { tracks, game } = useTracksContext();
    const filtered = tracks?.filter((track:TracksTypes) => track.Game.symbol == game)

    return(
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <p className="uppercase text-info font-bold mb-2">
                        Leaderboards
                    </p>
                    <p className="text-3xl md:text-4xl font-bold mb-3">
                        Compete on Official Tracks
                    </p>
                </div>
                <div className="lg:max-w-lg text-muted flex gap-6 items-center ">
                    <p className="max-w-2xl text-muted">
                        Submit your best drift scores and climb the rankings. 
                        Each track offers unique challenges for every skill level.
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <ClassButton />
            </div>

            <TracksList tracks={filtered} limit={6}/>
        </>
    )
}

export default TracksSection;