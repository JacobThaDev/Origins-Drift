import Link from "next/link";
import GlowText from "../misc/GlowText";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import PageHeader from "../layout/PageHeader";
import CountUp from "react-countup";

const HomeHeader = ({ stats }: { stats:any }) => {

    return(
        <PageHeader>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 border border-info/20 mb-8">
                <span className="text-sm font-medium text-info">Forza Horizon</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6 text-balance">
                The premier destination for <GlowText enableGlow={false} text="authentic"/> drifters
            </h1>

            <p className="text-muted text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto mb-10 leading-relaxed text-pretty">
                We are a community of dedicated drifting enthusiasts 
                from around the world. Compete on legendary tracks, 
                climb the leaderboards, and prove your skill.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 gap-y-3 mb-20">
                <Link href="/join" className="flex items-center text-lg justify-center gap-5 px-5 py-3.5 bg-info rounded-md text-black font-bold border-2 border-info group w-full md:w-auto">
                    Join the Club
                    <ArrowRightIcon height={20} strokeWidth={3}
                    className="transition-all group-hover:translate-x-2"/>
                </Link>

                <Link href="/#leaderboards" className="flex items-center text-lg justify-center gap-2 px-5 py-3.5 border-2 border-white/10 rounded-md hover:border-info hover:bg-info hover:text-black font-bold transition-all duration-300 w-full md:w-auto">
                    View Leaderboards
                </Link>
            </div>

            <div className="flex justify-center gap-20">
                <div className="text-center">
                    <p className="text-5xl font-black">
                        <CountUp
                            redraw={true}
                            start={0}
                            end={stats ? stats.users : 0} />
                    </p>
                    <p>Active Drifters</p>
                </div>
                <div className="w-[1px] bg-white/10 hidden lg:inline-block"/>
                <div className="text-center">
                    <p className="text-5xl font-black">
                        <CountUp
                            redraw={true}
                            start={0}
                            end={stats ? stats.tracks : 0} />
                    </p>
                    <p>Official Tracks</p>
                </div>
                <div className="w-[1px] bg-white/10 hidden lg:inline-block"/>
                <div className="text-center">
                    <p className="text-5xl font-black">
                        <CountUp
                            redraw={true}
                            start={0}
                            end={stats ? stats.submitted : 0} />
                    </p>
                    <p>Scores Submitted</p>
                </div>
            </div>
        </PageHeader>
    )
}

export default HomeHeader;