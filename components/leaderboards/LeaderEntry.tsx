import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { formatNumber } from "@/utils/Functions";
import { ClassABadge, ClassS1Badge } from "../misc/ClassBadges";
import PlatformIcon from "./PlatformIcon";
import Image from "next/image";

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
                        className="rounded-full border-4 border-info/50" />}
                </div>
                <div>
                    <p className="font-bold text-lg">
                        {displayName}
                    </p>
                    <p>{formatNumber(score.score, 0)}</p>
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