"use client"

import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import { ClassABadge, ClassS1Badge } from "../misc/ClassBadges";

const ClassSelector = () => {

    const { 
        classFilter, setClassFilter, loading 
    }:LeaderboardContextTypes = useLeaderboardContext();

    return(
        <div className="flex items-center justify-start gap-3 text-xs">
            <button 
                onClick={() => setClassFilter(classFilter == "a" ? "s1" : "a")}
                className="disabled:opacity-50"
                disabled={loading}>
                {classFilter == "a" ? <ClassABadge/> : <ClassS1Badge/>}
            </button>
        </div>
    )
}

export default ClassSelector;