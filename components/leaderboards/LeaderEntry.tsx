import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { formatNumber } from "@/utils/Functions";
import { ClassABadge, ClassS1Badge } from "../misc/ClassBadges";
import PlatformIcon from "./PlatformIcon";
import Image from "next/image";
import Link from "next/link";
import { VerifiedIcon } from "../icons/VerifiedIcon";

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
                    <div className="flex gap-1 items-center">
                        {score.verified && 
                            <VerifiedIcon height={20} strokeWidth={1.5} className="text-info"/>
                        }
                        <p>{formatNumber(score.score, 0)}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 pe-2 lg:pe-3">
                <PlatformIcon platform={score.User?.AccountData?.platform} />
                {score.class == "A" ? <ClassABadge/> : <ClassS1Badge/>}
            </div>
        </div>
    )
}

export default LeaderEntry;