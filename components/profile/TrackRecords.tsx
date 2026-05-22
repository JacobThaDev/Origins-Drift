"use client";

import { formatNumber } from "@/utils/Functions";
import { RecordsClassTypes, RecordsTypes } from "@/utils/types/RecordsTypes";
import { useState } from "react";
import { SpeedIcon } from "../icons/SpeedIcon";

interface TrackRecordsTypes {
    records: RecordsClassTypes|undefined,
}

const TrackRecords = ({ records }:  TrackRecordsTypes) => {

    const [ classType, setclassType ] = useState<"b"|"a"|"s1">("b");
    
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
                    <select 
                        onChange={(e:any) => setclassType(e.target.value)}
                        className="custom-select px-3 py-3 bg-button hover:bg-buttonHover outline-none w-full lg:w-[110px] truncate rounded-lg">
                        <option value="b">B-Class</option>
                        <option value="a">A-Class</option>
                        <option value="s1">S1-Class</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 bg-card rounded-xl overflow-hidden">
                {records && Object.keys(records).includes(classType) && records[classType].map((record:RecordsTypes, index:number) => {

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