"use client"

import { ScoresTypes } from "@/utils/types/ScoresTypes";
import Image from "next/image";
import Link from "next/link";
import { formatNumber, getRelativeTime } from "@/utils/Functions";
import { ArrowTopRightOnSquareIcon, CheckBadgeIcon, FlagIcon } from "@heroicons/react/24/outline";
import SubmitButton from "./SubmitButton";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { LoadingIcon } from "../icons/LoadingIcon";

const LeaderTable = () => {
    
    const { leaderboard, loading, fetching }:TracksContextTypes = useTracksContext();
    const { profile }:ProfileContextTypes = useProfileContext();
    
    if (!loading && leaderboard && leaderboard.length == 0) {
        return (
            <div className="p-10 bg-card text-center border-2 border-border rounded-2xl">
                <FlagIcon height={50} className="mx-auto mb-3"/>
                <p className="text-2xl font-bold">No legends here... yet</p>
                <p className="text-white/60 mb-4">This track is waiting for its first high score. Will it be yours?</p>
                <div className="flex justify-center">
                    {profile && <SubmitButton/>}
                </div>
            </div>
        )
    }

    return(
        <div className="bg-card relative border-2 border-border rounded-xl overflow-hidden font-mono">
            
            {fetching && 
            <div className="bg-card/80 absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm">
                <LoadingIcon height={50}/>
            </div>}

            <div className="flex items-center justify-between pe-4">
                <div className="p-5">
                    <p>Leaderboard</p>
                    <p className="text-sm text-white/70">Top 50</p>
                </div>
                {profile && <SubmitButton/>}
            </div>

            <div className="text-sm py-2 flex items-center pe-4 text-white/40 bg-black/10">
                <div className="w-[70px] text-center">Rank</div>
                <div>Username <span className="lg:hidden">/ Score</span></div>
                <div className="ml-auto hidden lg:inline-block">Score</div>
            </div>
            
            {leaderboard && leaderboard.length > 0 ? leaderboard.map((entry:ScoresTypes, index:number) => {

                return(
                    <div className={`flex items-center ${index % 2 && "bg-black/10"} py-4 pe-5`} key={"score-"+index}>
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
                                <Link href={`/profile/${entry.User?.discord_name}`} 
                                    className="text-lg font-semibold text-info hover:underline">
                                    {entry.User?.name}
                                </Link>
                                {entry.proof_url ?
                                <Link href={entry.proof_url.replace("i.", "").replace(".png", "").replace(".jpg", "")} 
                                        target="_blank" rel="nofollow noopener"
                                        className="underline block lg:hidden">
                                    {formatNumber(entry.score)}
                                </Link> : <p className="block lg:hidden">{formatNumber(entry.score)}</p> }
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-5">
                            <div className="hidden lg:flex gap-3 items-center text-lg">
                                {entry.verified && <>
                                    <div className="relative">
                                        <CheckBadgeIcon height={20} strokeWidth={2} className="text-info"/>
                                        <div className="hidden group-hover:inline-block absolute left-full ml-2 text-nowrap -top-1.5 p-1 px-2 rounded bg-black/30">
                                            Verified Score
                                        </div>
                                    </div>
                                </>}
                                
                                <p className="font-bold font-mono">
                                    {formatNumber(entry.score)}
                                </p>
                            </div>

                            <div className="hidden lg:inline-block text-nowrap text-sm text-white/60 w-[150px]">
                                {getRelativeTime(entry.createdAt)}
                            </div>
                            
                            <div className="w-[40px] hidden lg:inline-flex justify-center">
                            {entry.proof_url ?
                                <Link href={entry.proof_url.replace("i.", "").replace(".png", "").replace(".jpg", "")} target="_blank" rel="nofollow noopener"
                                    className="underline font-bold inline-block">
                                    <ArrowTopRightOnSquareIcon height={20}/>
                                </Link> : <></> }
                            </div>
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