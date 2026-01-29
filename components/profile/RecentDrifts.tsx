"use client"

import { formatNumber, getRelativeTime } from "@/utils/Functions";
import { ScoresTypes } from "@/utils/types/ScoresTypes";
import { RecordsClassTypes, RecordsTypes } from "@/utils/types/RecordsTypes";
import { TrophyIcon } from "@heroicons/react/24/outline";

const RecentDrifts = ({ recent, records } : { recent:ScoresTypes[], records:RecordsClassTypes|undefined }) => {
    
    return(
        <div>
            <div className="flex items-center gap-5 mb-5">
                <div>
                    <p className="text-sm text-muted">Last 10 Drifts</p>
                    <p className="text-3xl font-bold">Drift History</p>
                </div>
            </div>

            

            <div className="bg-card overflow-hidden rounded-xl">
                <table className="custom-table w-full">
                    <thead>
                        <tr>
                            <th>Track</th>
                            <th className="hidden lg:table-cell">Class</th>
                            <th>Score</th>
                            <th className="hidden lg:table-cell">Diff</th>
                            <th className="hidden lg:table-cell">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recent && recent.map((recent:ScoresTypes, index:number) => {

                            if (!recent.Track) {
                                return;
                            }

                            const classType = recent.class.toLowerCase() as "a"|"s1";
                            const record = records 
                                ? records[classType].filter((record:RecordsTypes) => record.id == recent.Track?.id)[0].top_score
                                : 0;

                            const difference = recent.score - recent.personal_best;
                            
                            return(
                                <tr key={"recent-"+index}>
                                    <td>
                                        <p>{recent.Track.name}</p>
                                        <p className="w-full text-sm text-muted lg:hidden">
                                            {recent.class}-{recent.class == "A" ? "800" : "900"}
                                        </p>
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        <p className="w-full text-sm text-muted">
                                            {recent.class}-{recent.class == "A" ? "800" : "900"}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold inline-flex gap-x-2 items-center">
                                            {formatNumber(recent.score)}
                                        </p>
                                        <div className="lg:hidden">
                                            {difference != recent.score && 
                                            <p className={`text-sm font-normal ${recent.personal_best > recent.score ? "text-danger" : recent.personal_best == 0 ? "text-muted" : "text-success"}`}>
                                                {difference > 0 && '+'}{formatNumber(difference)}
                                            </p>}
                                        </div>
                                    </td>
                                     <td className="hidden lg:flex gap-2 lg:items-center">
                                        {recent.personal_best > recent.score 
                                            ? <p className={`font-normal ${difference < 0 ? "text-danger" : difference == 0 ? "text-muted" : "text-success"}`}>
                                                {formatNumber(difference)}
                                            </p> 
                                            : <p className="flex items-center gap-2 text-sm text-success">
                                                +{formatNumber(difference)}
                                            </p>}

                                            {record == recent.score && <TrophyIcon height={16} className="text-success"/>}
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        <p className="text-sm italic text-muted">
                                            {getRelativeTime(recent.createdAt)}
                                        </p>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentDrifts;