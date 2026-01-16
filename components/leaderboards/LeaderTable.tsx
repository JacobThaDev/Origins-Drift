"use client"

import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/utils/Functions";
import { CheckBadgeIcon, FlagIcon } from "@heroicons/react/24/outline";
import SubmitButton from "./SubmitButton";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";

const LeaderTable = () => {
    
    const { scores, loading }:LeaderboardContextTypes = useLeaderboardContext();
    const { profile }:ProfileContextTypes = useProfileContext();
    
    return(
        <div className="bg-card rounded-xl overflow-hidden shadow-md">
            <div className="flex items-center justify-between pe-4">
                <div className="p-5">
                    <p>Leaderboard</p>
                    <p className="text-sm text-white/70">Top 25</p>
                </div>
                {profile && <SubmitButton/>}
            </div>

            <div className="text-sm py-2 flex items-center pe-4 text-white/40 bg-black/10">
                <div className="w-[70px] text-center">Rank</div>
                <div>Username <span className="lg:hidden">/ Score</span></div>
                <div className="ml-auto hidden lg:inline-block">Score</div>
            </div>
            
            {scores && scores.length > 0 ? scores.map((entry:LeadersTypes, index:number) => {

                let displayName = entry.User?.name;

                if (entry.User && entry.User.AccountData) {
                    if (entry.User.AccountData.display_name) {
                        displayName = entry.User.AccountData.display_name;
                    }
                }

                return(
                    <div className={`flex items-center ${index % 2 && "bg-black/10"} py-4`} key={"score-"+index}>
                        <div className="w-[70px] rounded-xl flex items-center justify-center font-black">
                            {index + 1}
                        </div>

                        <div className="flex items-center w-full gap-3">
                            <div>
                                {entry.User && 
                                <Image src={entry.User?.image} width={46} height={46} alt=""
                                    className="rounded-full border-[5px] border-black/30" />}
                            </div>
                            <div>
                                <Link href={`/profile/${entry.User?.Account.accountId}`} 
                                    target="_blank" className="text-lg font-bold text-warning hover:underline">
                                    {displayName}
                                </Link>
                                {entry.proof_url ?
                                <Link href={entry.proof_url.replace("i.", "").replace(".png", "").replace(".jpg", "")} 
                                        target="_blank" rel="nofollow noopener"
                                        className="underline block lg:hidden">
                                    {formatNumber(entry.score)}
                                </Link> : <p className="block lg:hidden">{formatNumber(entry.score)}</p> }
                            </div>
                        </div>

                        <div className="hidden lg:flex gap-3 items-center pe-5 text-lg">
                            {entry.verified && <>
                                <div className="relative">
                                    <CheckBadgeIcon height={20} strokeWidth={2} className="text-info"/>
                                    <div className="hidden group-hover:inline-block absolute left-full ml-2 text-nowrap -top-1.5 p-1 px-2 rounded bg-black/30">
                                        Verified Score
                                    </div>
                                </div>
                            </>}
                            
                            {entry.proof_url ?
                            <Link href={entry.proof_url.replace("i.", "").replace(".png", "").replace(".jpg", "")} target="_blank" rel="nofollow noopener"
                                className="underline">
                                {formatNumber(entry.score)}
                            </Link> : <p>{formatNumber(entry.score)}</p> }
                        </div>
                    </div>
                )
            }) 
            : !loading && <>
                <div className="py-5 text-center">
                    <FlagIcon height={50} className="mx-auto mb-3"/>
                    <p className="text-xl font-bold">No legends here... yet</p>
                    <p className="text-white/60 mb-4">This track is waiting for its first high score. Will it be yours?</p>
                </div>
            </>}
        </div>
    )
}

export default LeaderTable;