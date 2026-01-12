"use client"

import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import LocalApi from "@/services/LocalApi";
import { formatNumber } from "@/utils/Functions";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RecentEntries = () => {
    
    const { game, classFilter }:LeaderboardContextTypes = useLeaderboardContext();
    const { activeTrack }:TracksContextTypes = useTracksContext();

    const [ recent, setRecent ]   = useState<LeadersTypes[]>();
    const [ mounted, setMounted ] = useState<boolean>();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }
        
        async function loadRecent() {
            let recent = await LocalApi.get("/games/"+game+"/"+activeTrack.short_name+"/scores/"+classFilter+"")
                .then(r => r.data);
            
            if (recent) {
                setRecent(recent);
            }
        }

        loadRecent();
    }, [mounted, activeTrack]);

    return(
        <div className="bg-card rounded-xl overflow-hidden">
            <div className="p-5">
                <p>Recent Scores</p>
            </div>

            <div className="flex flex-col gap-2">
            {recent && recent.map((entry:LeadersTypes, index:number) => {

                let displayName = entry.User?.name;

                if (entry.User && entry.User.AccountData) {
                    if (entry.User.AccountData.display_name) {
                        displayName = entry.User.AccountData.display_name;
                    }
                }

                return(
                    <div className={`flex gap-3 items-center ${index % 2 == 0 && "bg-black/10"} py-2 px-5`} key={"recent-"+index}>
                        <div className="hidden lg:inline-block">
                            {entry.User && 
                            <Image src={entry.User?.image} width={34} height={34} alt=""
                                className="rounded-full border-[2px] border-black/30" />}
                        </div>
                        <div>
                            <Link href={`/profile/${entry.User?.name?.toLowerCase().replace(" ", "_")}`} 
                                target="_blank" className="text-warning hover:underline">
                                {displayName}
                            </Link>
                            <p className="text-sm">{formatNumber(entry.score)}</p>
                        </div>
                        <div className="ml-auto text-white/70 text-sm">
                            {new Date(entry.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default RecentEntries;