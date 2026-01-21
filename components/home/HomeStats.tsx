"use client";

import { FireIcon, QueueListIcon, TrophyIcon } from "@heroicons/react/24/outline";
import Container from "../layout/Container";
import { BullseyeIcon } from "../icons/BullseyeIcon";
import CountUp from 'react-countup';

const HomeStats = ({ stats }: { stats:any }) => {
    return(
       <div className="bg-card/50 py-20">
            <Container>
                <div className="flex flex-col justify-center text-center gap-4">
                    <div className="text-center mb-12">
                        <h2 className="text-sm font-semibold text-info uppercase tracking-wider mb-3">
                            Club Statistics
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold text-foreground">
                            Numbers that speak for themselves
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="bg-card rounded-xl p-7 text-start border-2 border-border hover:border-info/50 transition-all duration-300 hover:scale-110 hover:rotate-[-5deg]">
                            <div className="bg-warning/20 rounded-lg w-16 h-16 flex items-center justify-center mb-5">
                                <TrophyIcon height={38} className="text-warning"/>
                            </div>

                            <p className="text-4xl font-black">
                                {stats ?
                                <CountUp
                                    start={0}
                                    end={stats.max_score.maxScore}
                                    /> : 0}
                            </p>
                            <p className="text-lg font-bold mb-3">Highest Score</p>
                            <p className="text-muted">{stats?.max_score.Track.name} Circuit</p>
                        </div>

                        <div className="bg-card rounded-xl p-7 text-start border-2 border-border hover:border-info/50 transition-all duration-300 hover:scale-110 hover:rotate-[-5deg]">
                            <div className="bg-danger/20 rounded-lg w-16 h-16 flex items-center justify-center mb-5">
                                <FireIcon height={38} className="text-danger"/>
                            </div>

                            <p className="text-4xl font-black">
                                {stats ?
                                <CountUp
                                    start={0}
                                    end={stats.score_sum/1_000_000}
                                    decimals={2}
                                    suffix="m"
                                    /> : 0}
                            </p>
                            <p className="text-lg font-bold mb-3">Total Score</p>
                            <p className="text-muted">Sum of all scores submitted</p>
                        </div>

                        <div className="bg-card rounded-xl p-7 text-start border-2 border-border hover:border-info/50 transition-all duration-300 hover:scale-110 hover:rotate-[-5deg]">
                            <div className="bg-info/20 rounded-lg w-16 h-16 flex items-center justify-center mb-5">
                                <QueueListIcon height={38} className="text-info"/>
                            </div>

                            <p className="text-4xl font-black">
                                {stats ?
                                <CountUp
                                    start={0}
                                    end={stats.cars}
                                    /> : 0}
                            </p>
                            <p className="text-lg font-bold mb-3">Cars</p>
                            <p className="text-muted">Cars we have data for</p>
                        </div>

                        <div className="bg-card rounded-xl p-7 text-start border-2 border-border hover:border-info/50 transition-all duration-300 hover:scale-110 hover:rotate-[-5deg]">
                            <div className="bg-success/20 rounded-lg w-16 h-16 flex items-center justify-center mb-5">
                                <BullseyeIcon height={38} className="text-success"/>
                            </div>

                            <p className="text-4xl font-black">
                                 {stats ?
                                <CountUp
                                    start={0}
                                    end={stats.avg_score}
                                    /> : 0}
                            </p>
                            <p className="text-lg font-bold mb-3">Average Score</p>
                            <p className="text-muted">An average of all scores</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HomeStats;