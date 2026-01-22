"use client"

import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { ArrowRightIcon,  } from "@heroicons/react/24/outline";
import Link from "next/link";

const DiscordCard = () => {
    return(
        <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-discord/30 to-card rounded-xl p-10 border-[1px] border-discord/30 hover:border-discord transition-all">      
            <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-start gap-8">
                <div>
                    <div className="bg-discord w-20 h-20 flex items-center justify-center rounded-2xl">
                        <DiscordIcon width={48} className="text-white"/>
                    </div>
                </div>
                <div>
                    <p className="text-2xl font-black text-foreground mb-2">
                        Origins Drift Club Discord
                    </p>
                    <p className="text-muted mb-5">Join drifters from around the world in our active community. Get help with tuning, share your clips, and participate in exclusive events.</p>

                    <div className="flex items-center gap-3 flex-col md:flex-row">
                        <Link href={process.env.NEXT_PUBLIC_DISCORD_URL} 
                            target="_blank" rel="nofollow"
                            className="inline-flex items-center justify-center gap-4 group h-10 px-6 bg-discord hover:bg-discord/80 rounded-md text-nowrap">
                            <p className="font-semibold">Join Discord Server</p>
                            <ArrowRightIcon height={16} strokeWidth={3} className="group-hover:translate-x-2 transition-all duration-300" />
                        </Link>
                        <p className="text-muted">Free to join</p>
                    </div>
                
                </div>
            </div>

            {/* <hr className="border-border my-10" />

            <div className="flex items-center justify-center text-center gap-x-20">
                <div>
                    <p className="text-3xl font-black">500+</p>
                    <p className="text-muted">Members</p>
                </div>

                <div className="h-10 bg-border w-[1px]"/>

                <div>
                    <p className="text-3xl font-black">150</p>
                    <p className="text-muted">Online</p>
                </div>

                <div className="h-10 bg-border w-[1px]"/>

                <div>
                    <p className="text-3xl font-black">24/7</p>
                    <p className="text-muted">Active Chat</p>
                </div>
            </div> */}
            
        </div>
    )
}

export default DiscordCard;