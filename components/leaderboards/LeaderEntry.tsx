import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { formatNumber } from "@/utils/Functions";
import PlatformIcon from "./PlatformIcon";
import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon } from '@heroicons/react/24/outline'

const LeaderEntry = ({ score, rank } : { score: LeadersTypes, rank: number }) => {

    let displayName = score.User?.name;

    if (score.User && score.User.AccountData) {
        if (score.User.AccountData.display_name) {
            displayName = score.User.AccountData.display_name;
        }
    }

    return(
        <div className="bg-card rounded-2xl p-2 lg:p-3 !py-5 flex items-center relative z-[50] gap-3">
            <div className="w-[70px] rounded-xl flex items-center justify-center font-black">
                {rank + 1}
            </div>

            <div className="flex items-center w-full gap-3">
                <div className="hidden lg:inline-block">
                    {score.User && 
                    <Image src={score.User?.image} width={46} height={46} alt=""
                        className="rounded-full border-[5px] border-black/30" />}
                </div>
                <div>
                    <Link href={`/profile/${score.User?.name?.toLowerCase().replace(" ", "_")}`} 
                        target="_blank" className="font-bold text-lg text-warning hover:underline">
                        {displayName}
                    </Link>
                    <div className="flex gap-1 items-center group">
                        <p>{formatNumber(score.score, 0)}</p>
                        {score.verified && <>
                            <div className="relative">
                                <CheckBadgeIcon height={20} strokeWidth={2} className="text-info"/>
                                <div className="hidden group-hover:inline-block absolute left-full ml-2 text-nowrap -top-1.5 p-1 px-2 rounded bg-black/30">
                                    Verified Score
                                </div>
                            </div>
                            
                            </>
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 pe-2 lg:pe-3">
                <PlatformIcon platform={score.User?.AccountData?.platform} />
            </div>
        </div>
    )
}

export default LeaderEntry;