"use client";

import { ClockIcon, FireIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { BullseyeIcon } from "../icons/BullseyeIcon";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import CountUp from "react-countup";
import Container from "../layout/Container";

const DriverStatistics = ({ stats } : { stats:ProfileStatsTypes }) => {

    return(
        <div className="pt-10">
            <Container>
                <div>

                    <div className="flex flex-col gap-4 lg:flex-row items-center justify-evenly">

                        <div className="bg-card border-[1px] border-secondary w-full rounded-xl p-6 flex items-center gap-5">
                            <div className="flex items-center justify-center bg-secondary rounded-lg w-12 h-12">
                                <TrophyIcon height={24} className="text-muted"/>
                            </div>
                            <div>
                                <p className="text-2xl lg:text-3xl text-info font-black">
                                    {stats ?
                                    <CountUp
                                        start={0}
                                        end={stats.highest_score.score}
                                        /> : 0}
                                </p>
                                <p className=" text-muted text-sm">
                                    Best Drift Score
                                </p>
                            </div>
                        </div>

                        <div className="bg-card border-[1px] border-secondary w-full rounded-xl p-6 flex items-center gap-5">
                            <div className="flex items-center justify-center bg-secondary rounded-lg w-12 h-12">
                                <FireIcon height={24} className="text-muted"/>
                            </div>
                            <div>
                                <p className="text-2xl lg:text-3xl text-info font-black">
                                    {stats ?
                                        <CountUp
                                            start={0}
                                            end={stats.total_entries}
                                            /> : 0}
                                </p>
                                <p className=" text-muted text-sm">
                                    Total Drifts
                                </p>
                            </div>
                        </div>

                        <div className="bg-card border-[1px] border-secondary w-full rounded-xl p-6 flex items-center gap-5">
                            <div className="flex items-center justify-center bg-secondary rounded-lg w-12 h-12">
                                <ClockIcon height={24} className="text-muted"/>
                            </div>
                            <div>
                                <p className="text-2xl lg:text-3xl text-info font-black">
                                    {stats ?
                                        <CountUp
                                            start={0}
                                            end={stats.track_time / 60}
                                            decimals={2}
                                            suffix=" hrs"
                                            /> : 0}
                                </p>
                                <p className=" text-muted text-sm">
                                    Track Time
                                </p>
                            </div>
                        </div>

                        <div className="bg-card border-[1px] border-secondary w-full rounded-xl p-6 flex items-center gap-5">
                            <div className="flex items-center justify-center bg-secondary rounded-lg w-12 h-12">
                                <BullseyeIcon height={24} className="text-muted"/>
                            </div>
                            <div>
                                <p className="text-2xl lg:text-3xl text-info font-black">
                                    {stats ?
                                    <CountUp
                                        start={0}
                                        end={stats.total_score/1_000_000}
                                        decimals={2}
                                        suffix="m"
                                        /> : 0}
                                </p>
                                <p className=" text-muted text-sm">
                                    Total Score
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

interface ProfileStatsTypes {
   total_entries: number;
   track_time: number;
   total_score: number;
   highest_score: LeadersTypes;
   error?: {
        message: string;
   };
}

export default DriverStatistics;