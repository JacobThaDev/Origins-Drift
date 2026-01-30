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
                        <div className="bg-card rounded-xl p-7 text-start border-2 border-border hover:border-warning/80 transition-all duration-300 hover:scale-110">
                            <div className="bg-warning/20 rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-5">
                                <TrophyIcon height={30} className="text-warning max-w-[24px] md:max-w-[38px]"/>
                            </div>

                            <p className="text-3xl md:text-4xl font-black text-warning">
                                {stats ?
                                <CountUp
                                    start={0}
                                    end={stats ? stats.max_score.score : 0}
                                    /> : 0}
                            </p>
                            <p className="text-sm md:text-lg font-bold mb-3">Highest Score</p>
                            <p className="text-sm md:text-base text-muted">{stats?.max_score.Track.name} Circuit</p>
                        </div>

                        <div className="bg-card rounded-xl p-7 text-start border-2 border-border hover:border-danger/80 transition-all duration-300 hover:scale-110">
                            <div className="bg-danger/20 rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-5">
                                <FireIcon height={30} className="text-danger max-w-[24px] md:max-w-[38px]"/>
                            </div>

                            <p className="text-3xl md:text-4xl font-black text-danger">
                                {stats ?
                                <CountUp
                                    start={0}
                                    end={stats.score_sum/1_000_000}
                                    decimals={2}
                                    suffix="m"
                                    /> : 0}
                            </p>
                            <p className="text-sm md:text-lg font-bold mb-3">Total Score</p>
                            <p className="text-sm md:text-base text-muted">Sum of all scores submitted</p>
                        </div>

                        <div className="bg-card rounded-xl p-7 text-start border-2 border-border hover:border-info/80 transition-all duration-300 hover:scale-110">
                            <div className="bg-info/20 rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-5">
                                <QueueListIcon height={30} className="text-info max-w-[24px] md:max-w-[38px]"/>
                            </div>

                            <p className="text-3xl md:text-4xl font-black text-info">
                                {stats ?
                                <CountUp
                                    start={0}
                                    end={stats.cars}
                                    /> : 0}
                            </p>
                            <p className="text-sm md:text-lg font-bold mb-3">Cars</p>
                            <p className="text-muted">Cars we have data for</p>
                        </div>

                        <div className="bg-card rounded-xl p-7 text-start border-2 border-border hover:border-success/80 transition-all duration-300 hover:scale-110">
                            <div className="bg-success/20 rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-5">
                                <BullseyeIcon height={30} strokeWidth={ 1} className="text-success max-w-[24px] md:max-w-[38px]"/>
                            </div>

                            <p className="text-3xl md:text-4xl font-black text-success">
                                 {stats ?
                                <CountUp
                                    start={0}
                                    end={stats.avg_score}
                                    /> : 0}
                            </p>
                            <p className="text-sm md:text-lg font-bold mb-3">Average Score</p>
                            <p className="text-sm md:text-base text-muted">An average of all scores</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HomeStats;