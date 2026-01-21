"use client";

import Container from "../layout/Container";
import { useEffect, useState } from "react";
import { ClockIcon, FireIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { BullseyeIcon } from "../icons/BullseyeIcon";
import LocalApi from "@/services/LocalApi";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { ProfileTypes } from "@/utils/types/ProfileTypes";
import CountUp from "react-countup";

const DriverStatistics = ({ member }:  { member: ProfileTypes }) => {

    const [ stats, setStats ] = useState<any>();
    const [ mounted, setMounted ] = useState<boolean>();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function getUserData() {
            const result:ProfileStatsTypes = await LocalApi.get("/profile/"+member.account.User?.id+"/stats");
            
            if (result.error) {
                return;
            }

            setStats(result);
        }

        getUserData();
    },// eslint-disable-next-line 
    [mounted]);

    return(
        <div className="bg-card/50 py-20">
            <Container>
                <div className="flex flex-col justify-center text-center gap-4">
                    <div className="text-center mb-12">
                        <h2 className="text-sm font-semibold text-info uppercase tracking-wider mb-3">
                            Driver Statistics
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold text-foreground mb-10">
                            Performance at a Glance
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-card rounded-lg p-7 text-start border-2 border-border hover:border-info/50 transition-all duration-300">
                                <div className="bg-warning/20 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                                    <TrophyIcon height={30} className="text-warning"/>
                                </div>

                                <p className="text-4xl font-black">
                                    {stats ?
                                    <CountUp
                                        start={0}
                                        end={stats.highest_score.score}
                                        /> : 0}
                                </p>
                                <p className="text-lg font-bold mb-1">Best Drift Score</p>
                                <p className="text-white/60">
                                    {stats?.highest_score?.Track.name || "Unknown"} Circuit{" "}
                                    | {stats?.highest_score.class}-{stats?.highest_score.class == "a" ? "800" : "900"}
                                </p>
                            </div>

                            <div className="bg-card rounded-lg p-7 text-start border-2 border-border hover:border-info/50 transition-all duration-300">
                                <div className="bg-danger/20 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                                    <FireIcon height={30} className="text-danger"/>
                                </div>

                                <p className="text-4xl font-black">
                                    {stats ?
                                    <CountUp
                                        start={0}
                                        end={stats.total_entries}
                                        /> : 0}
                                </p>
                                <p className="text-lg font-bold mb-1">Total Drifts</p>
                                <p className="text-white/60">All-time submissions</p>
                            </div>

                            <div className="bg-card rounded-lg p-7 text-start border-2 border-border hover:border-info/50 transition-all duration-300">
                                <div className="bg-info/20 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                                    <ClockIcon height={30} className="text-info"/>
                                </div>

                                <p className="text-4xl font-black">
                                    {stats ?
                                    <CountUp
                                        start={0}
                                        end={stats.track_time / 60}
                                        decimals={2}
                                        suffix=" hrs"
                                        /> : 0}
                                </p>
                                <p className="text-lg font-bold mb-1">Track Time</p>
                                <p className="text-white/60">Time spent drifting</p>
                            </div>

                            <div className="bg-card rounded-lg p-7 text-start border-2 border-border hover:border-info/50 transition-all duration-300">
                                <div className="bg-success/20 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                                    <BullseyeIcon height={30} className="text-success"/>
                                </div>

                                <p className="text-4xl font-black">
                                    {stats ?
                                    <CountUp
                                        start={0}
                                        end={stats.total_score/1_000_000}
                                        decimals={2}
                                        suffix="m"
                                        /> : 0}
                                </p>
                                <p className="text-lg font-bold mb-1">Total Score</p>
                                <p className="text-white/60">A sum of all scores</p>
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