"use client"

import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { ScoresTypes } from "@/utils/types/ScoresTypes";
import { useEffect, useState } from "react";
import LeaderEntry from "./LeaderEntry";
import { LoadingIcon } from "../icons/LoadingIcon";
import { TracksTypes } from "@/utils/types/TracksTypes";
import LocalApi from "@/services/LocalApi";
import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import ClassSelector from "./ClassSelector";

const LeaderTable = ({ track }: { track: TracksTypes }) => {

    const [ trackData, setTrackData ] = useState<ScoresTypes|undefined>(undefined);
    const [ mounted, setMounted ] = useState<boolean>(false);
    const { classFilter, loading, setLoading }:LeaderboardContextTypes = useLeaderboardContext();

    useEffect(() => {
        setMounted(true)
        setLoading(true);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function loadScores() {
            const trackData:ScoresTypes = await LocalApi.get("games/fh5/"+track.short_name+"/leaders/"+classFilter).then(r => r.data);;
            
            if (!trackData.error && trackData.game) {
                setTrackData(trackData);
            }

            setLoading(false);
        }

        loadScores();
    },// eslint-disable-next-line react-hooks/exhaustive-deps
    [mounted, classFilter])
    
    return(
        <div>
            <ClassSelector />
            <div className="flex flex-col gap-4">
                {loading && <LoadingIcon height={30} />}
                {trackData ? trackData.scores.map((score:LeadersTypes, index:number) => {
                    return(
                        <LeaderEntry key={index} score={score} rank={index} />
                    )
                }) : ""}
            </div>
        </div>
    )
}

export default LeaderTable;