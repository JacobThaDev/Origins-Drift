"use client";

import { formatNumber } from "@/utils/Functions";
import { ArrowPathRoundedSquareIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { RecordsClassTypes, RecordsTypes } from "@/utils/types/RecordsTypes";
import { useState } from "react";
import { SpeedIcon } from "../icons/SpeedIcon";

interface TrackRecordsTypes {
    records: RecordsClassTypes|undefined,
}

const TrackRecords = ({ records }:  TrackRecordsTypes) => {

    const [ classType, setclassType ] = useState<"a"|"s1">("a");
    
    if (!records)
        return null;

    return(
        <div>
            <div className="flex items-end justify-between gap-5 mb-5">
                <div>
                    <p className="text-sm text-muted">Personal Best</p>
                    <p className="text-3xl font-bold">Track Records</p>
                </div>
                <div>
                    <button onClick={() => setclassType(classType == "a" ? "s1" : "a")} 
                        className="inline-flex items-center gap-3 relative border-[1px] border-secondary p-3 rounded-lg">
                        <SpeedIcon height={18} strokeWidth={2} className="text-muted"/>
                        <div className="text-white flex items-center gap-2">
                            {classType.toUpperCase()}-{classType == "a" ? 800 : 900}
                        </div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 bg-card rounded-xl overflow-hidden">
                {records && records[classType].map((record:RecordsTypes, index:number) => {

                    return(
                        <div className={`flex items-center py-4 px-5 ${index % 2 == 0 && "bg-secondary/40"}`} key={"record-"+index}>
                            <div className="flex items-center gap-1 w-full max-w-[50px]">
                                <p className="text-muted font-semibold font-mono">
                                   #{record.rank}
                                </p>
                            </div>
                            <div className="w-full">
                                <p>{record.name}</p>
                            </div>
                            <div>
                                <p className="font-mono">
                                    {!record.top_score ? 0 : formatNumber(record.top_score)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TrackRecords;