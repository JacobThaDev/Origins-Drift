"use client"

import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { formatNumber } from "@/utils/Functions";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RecentEntries = () => {
    
    const { recent, loadRecent, classFilter }:LeaderboardContextTypes = useLeaderboardContext();
    const { current }:TracksContextTypes = useTracksContext();

    const [ mounted, setMounted ] = useState<boolean>();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        loadRecent();
    },// eslint-disable-next-line 
    [mounted, current, classFilter]);

    return(
        <div className="bg-card rounded-xl overflow-hidden">
            <div className="p-5">
                <p>Recent Scores</p>
            </div>

            <div className="flex flex-col gap-2">
            {recent && recent.map((entry:LeadersTypes, index:number) => {

                const displayName = entry.User?.name;

                return(
                    <div className={`flex gap-3 items-center ${index % 2 == 0 && "bg-black/10"} py-2 px-5`} key={"recent-"+index}>
                        <div className="hidden lg:inline-block">
                            {entry.User && 
                            <Image src={entry.User?.image} width={34} height={34} alt=""
                                className="rounded-full border-[2px] border-black/30" />}
                        </div>
                        <div>
                            <Link href={`/profile/${entry.User?.Account.accountId}`} 
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