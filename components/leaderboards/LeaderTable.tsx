"use client"

import { LoadingIcon } from "../icons/LoadingIcon";
import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import ClassSelector from "./ClassSelector";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import LeaderEntry from "./LeaderEntry";

const LeaderTable = () => {
    
    const { scores, loading }:LeaderboardContextTypes = useLeaderboardContext();
    
    return(
        <div>
            <div className="flex gap-3 items-center mb-3">
                <ClassSelector />
                {loading && <LoadingIcon height={30} />}
            </div>
            <div className="flex flex-col gap-4">
                {scores && scores.map((score:LeadersTypes, index:number) => {
                    return(
                        <LeaderEntry key={index} score={score} rank={index} />
                    )
                })}
            </div>
        </div>
    )
}

export default LeaderTable;