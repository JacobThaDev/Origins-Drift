"use client"

import Container from "@/components/layout/Container";
import { BellIcon, GlobeAltIcon, TrophyIcon } from "@heroicons/react/24/outline";
import DiscordCard from "./DiscordCard";

const DiscordSection = () => {
    return(
        <div className="pb-24">
            <Container>
                <div className="text-center mb-10">
                    <p className="text-3xl md:text-4xl tracking-tight font-black mb-5">
                        Step 1 : Join the Discord
                    </p>
                    <p className="max-w-xl mx-auto text-muted">
                        Our Discord server is the heart of the Origins community. 
                        Stay connected and never miss an update.
                    </p>
                </div>
                
                <div className="grid sm:grid-cols-2 max-w-4xl mx-auto gap-4 mb-10">

                    <div className="bg-card rounded-xl p-10 border-[1px] border-warning/30 hover:border-warning transition-all">
                        <div className="bg-warning/10 rounded-lg w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mb-5">
                            <BellIcon height={32} className="text-warning max-w-[24px] md:max-w-[32px]"/>
                        </div>

                        <p className="text-lg font-bold mb-3">
                            Latest News &amp; Events
                        </p>
                        <p className="text-muted">
                            Be the first to know about new tracks, events, and club announcements.
                        </p>
                    </div>

                    <div className="bg-card rounded-xl p-10 border-[1px] border-info/30 hover:border-info transition-all">
                        <div className="bg-info/10 rounded-lg w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mb-5">
                            <TrophyIcon height={32} className="text-info max-w-[24px] md:max-w-[32px]"/>
                        </div>

                        <p className="text-lg font-bold mb-3">
                            Score Updates
                        </p>
                        <p className="text-muted">
                            Real-time leaderboard updates and notifications when records are broken.
                        </p>
                    </div>

                    <div className="bg-card rounded-xl p-10 border-[1px] border-purple/30 hover:border-purple transition-all">
                        <div className="bg-purple/10 rounded-lg w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mb-5">
                            <GlobeAltIcon height={32} className="text-purple max-w-[24px] md:max-w-[32px]"/>
                        </div>

                        <p className="text-lg font-bold mb-3">
                            Website Updates
                        </p>
                        <p className="text-muted">
                            Get notified about new features, improvements, and maintenance schedules.
                        </p>
                    </div>

                    <div className="bg-card rounded-xl p-10 border-[1px] border-green/30 hover:border-green transition-all">
                        <div className="bg-green/10 rounded-lg w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mb-5">
                            <GlobeAltIcon height={32} className="text-green max-w-[24px] md:max-w-[32px]"/>
                        </div>

                        <p className="text-lg font-bold mb-3">
                            Community Chat
                        </p>
                        <p className="text-muted">
                            Connect with fellow drifters, share tips, and find drift partners.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <DiscordCard/>
                </div>
            </Container>
        </div>
    )
}

export default DiscordSection;