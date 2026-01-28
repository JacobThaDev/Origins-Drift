"use client"

import { formatNumber, getRelativeTime } from "@/utils/Functions";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { ClockIcon} from "@heroicons/react/24/outline";

const RecentDrifts = ({ recent } : { recent:LeadersTypes[] }) => {

    return(
        <div>
            <div className="flex items-center gap-5 mb-5">
                <div>
                    <p className="text-sm text-muted">Last 10 Drifts</p>
                    <p className="text-3xl font-bold">Drift History</p>
                </div>
            </div>

            <div className="bg-card overflow-hidden flex flex-col rounded-xl">
                {recent && recent.map((recent:LeadersTypes, index:number) => {

                    if (!recent.Track) {
                        return;
                    }

                    return(
                        <div key={"recent-"+index} className={`flex items-center gap-4 p-4 ${index % 2 && "bg-secondary/40"}`}>
                            <div>
                                <ClockIcon height={24} className="text-white/20"/>
                            </div>
                            <div className="flex items-center gap-5 w-full">
                                <div className="flex flex-col lg:flex-row w-full">
                                    <p className="w-full">
                                        {recent.Track.name}
                                    </p>
                                    <p className="w-full text-sm text-muted">
                                        {recent.class}-{recent.class == "A" ? "800" : "900"}
                                    </p>
                                </div>

                                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3">
                                    <p className="font-bold text-xl lg:w-[150px] lg:text-end">
                                        {formatNumber(recent.score)}
                                    </p>
                                    <p className="text-muted text-sm text-nowrap lg:w-[150px]">
                                        {getRelativeTime(recent.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )

                    // return(
                    // <div key={index} className="bg-card rounded-xl p-4 border-secondary flex gap-4 items-center">
                    //     <div className="pt-2">
                    //         <ClockIcon height={30} className="text-white/20"/>
                    //     </div>
                    //     <div>
                    //         <p className="text-sm text-muted">{recent.Track.name}</p>
                    //         <p className="font-bold text-lg text-info">
                    //             {formatNumber(recent.score)}
                    //         </p>
                    //     </div>
                    //     <div className="ml-auto">
                    //         <p className="font-bold text-muted bg-secondary w-7 h-7 flex items-center justify-center rounded-lg">
                    //             {recent.class}
                    //         </p>

                    //          <p className="text-muted text-sm">
                    //             {getRelativeTime(recent.createdAt)}
                    //         </p>
                    //     </div>
                    // </div>)
                })}
            </div>
                
        </div>
    )
}

export default RecentDrifts;