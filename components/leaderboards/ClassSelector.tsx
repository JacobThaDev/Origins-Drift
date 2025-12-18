"use client"

import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";

const ClassSelector = () => {

    const { classFilter, setClassFilter, loading }:LeaderboardContextTypes = useLeaderboardContext();

    return(
        <div className="flex items-center justify-end mb-3 gap-3">
            <p className="text-sm text-muted">Class</p>
            <button onClick={() => setClassFilter(classFilter == "a" ? "s1" : "a")}
                disabled={loading}
                    className="bg-card px-5 py-2.5 rounded-xl disabled:opacity-60">
                {classFilter.toUpperCase()}-{classFilter == "a" ? "800" : "900"} 
            </button>
        </div>
    )
}

export default ClassSelector;