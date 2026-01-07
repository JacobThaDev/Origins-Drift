"use client"

import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import LeaderEntry from "./LeaderEntry";

const LeaderTable = () => {
    
    const { scores }:LeaderboardContextTypes = useLeaderboardContext();
    
    return(
        <div className="flex flex-col gap-2">
            {scores && scores.map((score:LeadersTypes, index:number) => {
                return(
                    <LeaderEntry key={index} score={score} rank={index} />
                )
            })}
        </div>
    )
}

export default LeaderTable;