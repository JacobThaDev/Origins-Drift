"use client"

import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";

const ClassSelector = () => {

    const { 
        classFilter, setClassFilter, loading 
    }:LeaderboardContextTypes = useLeaderboardContext();

    return(
        <>
            <button disabled={loading}
                onClick={() => setClassFilter(classFilter == "a" ? "s1" : "a")} 
                className={`disabled:opacity-50 flex items-stretch } rounded-xl overflow-hidden h-[60px] bg-button w-full lg:w-auto`}>
                
                <div className={`min-w-[60px] bg-black/20 flex items-center justify-center font-bold`}>
                    PI
                </div>
                <div className={`flex items-center ps-5 lg:ps-0 lg:justify-center text-nowrap w-full lg:w-[100px]`}>
                    {classFilter == "a" ? "A-800" : "S1-900"}
                </div>
            </button>
        </>
    )
}

export default ClassSelector;