import LocalApi from "@/services/LocalApi";
import { formatNumber, getRelativeTime } from "@/utils/Functions";
import { LeaderboardTypes } from "@/utils/types/LeaderboardTypes";
import { ScoresTypes } from "@/utils/types/ScoresTypes";
import { ArrowTopRightOnSquareIcon, CheckBadgeIcon, FlagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingIcon } from "../icons/LoadingIcon";
import SubmitButton from "./SubmitButton";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";

const Leaderboard = ({ track, classType }: { track: string, classType: "b"|"a"|"s1" }) => {

    const { profile }:ProfileContextTypes = useProfileContext();
     
    const [ mounted, setMounted ] = useState<boolean>();
    const [ trackData, setTrackData ] = useState<TracksTypes>();
    const [ error, setError ]     = useState<string>();
    const [ loading, setLoading ] = useState<boolean>();
    const [ fetching, setFetching ] = useState<boolean>();
    const [ leaderboard, setLeaderboard ] = useState< ScoresTypes[]|undefined>();

    useEffect(() => {setMounted(true); setLoading(true); }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        updateLeaderboard();

    },// eslint-disable-next-line 
    [mounted]);
    
    const updateLeaderboard = async() => {
        setFetching(true)
        try {
            let results:LeaderboardTypes = await LocalApi.get(
                `/tracks/${track}/${classType}/leaderboard`
            );
            
            if (results.error) {
                setError(results.error);
                setFetching(false);
                setLoading(false);
                return false;
            }
            
            setTrackData(results.track);
            setLeaderboard(results.leaderboard);
            setFetching(false);
            setLoading(false);
        } catch (err:any) {
            console.log(err);
        }    
    }

    return(
        <>
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
                {profile && <SubmitButton track={track} classType={classType} trackData={trackData}/>}
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
                                <Image unoptimized src={entry.User?.image} width={46} height={46} alt=""
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
        </>
    )

}

export default Leaderboard;