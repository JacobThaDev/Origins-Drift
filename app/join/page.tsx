"use client"

import { UsersIcon } from "@/components/icons/UsersIcon";
import DiscordSection from "@/components/join/DiscordSection";
import JoinGroupSection from "@/components/join/JoinGroupSection";
import PageHeader from "@/components/layout/PageHeader";
import GlowText from "@/components/misc/GlowText";

export default function Join() {

    return (
        <>
            <PageHeader gradient={true}>
                <>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 border border-info/20 mb-8">
                        <div>
                            <UsersIcon height={18} className="text-info" strokeWidth={2}/>
                        </div>
                        <span className="text-sm font-medium text-info">Become a Member</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6 text-balance">
                        Join the <GlowText enableGlow={false} text="Origins"/><br/> <GlowText enableGlow={false} text="Drift"/> Club
                    </h1>

                    <p className="text-muted text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto mb-10 leading-relaxed text-pretty">
                        Follow these steps to become an official member. Join our in-game club 
                        and Discord server to compete, connect, and climb the leaderboards.
                    </p>
                </>
            </PageHeader>

            <DiscordSection />
            <JoinGroupSection/>
        </>
    );

}