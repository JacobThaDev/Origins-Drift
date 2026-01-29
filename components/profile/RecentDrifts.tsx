"use client"

import { formatNumber, getRelativeTime } from "@/utils/Functions";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { RecordsClassTypes, RecordsTypes } from "@/utils/types/RecordsTypes";
import GlowText from "../misc/GlowText";
import { TrophyIcon } from "@heroicons/react/24/outline";

const RecentDrifts = ({ recent, records } : { recent:LeadersTypes[], records:RecordsClassTypes|undefined }) => {
    
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
                    <tr>
                        <th>Track</th>
                        <th className="hidden lg:table-cell">Class</th>
                        <th>Score</th>
                        <th className="hidden lg:table-cell">Date</th>
                    </tr>
                    <tbody>
                        {recent && recent.map((recent:LeadersTypes, index:number) => {

                            if (!recent.Track) {
                                return;
                            }

                            const classType = recent.class.toLowerCase() as "a"|"s1";
                            const record = records 
                                ? records[classType].filter((record:RecordsTypes) => record.id == recent.Track?.id)[0].top_score
                                : 0;

                            const difference = recent.score - record;
                            
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
                                        <p className="font-bold inline-flex flex-col lg:flex-row gap-x-3 lg:items-center">
                                            {formatNumber(recent.score)} 
                                            {difference != 0 && <small className={`font-normal ${difference < 0 ? "text-danger" : difference == 0 ? "text-muted" : "text-success"}`}>
                                               {formatNumber(difference)}
                                            </small>}
                                        </p>
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