import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { CheckIcon, TrophyIcon } from "@heroicons/react/24/outline";
import Meteors from "../../misc/Meteors";
import { formatNumber } from "@/utils/Functions";
import GlowText from "../../misc/GlowText";

interface PersonalBestBoxTypes {
    score: number;
    track: TracksTypes;
    submitted: LeadersTypes;
    continueBtn: () => void;
}

const PersonalBestBox = ({ score, track, submitted, continueBtn }: PersonalBestBoxTypes) => {
    return(
        <div className="text-center relative overflow-hidden">
            <Meteors/>
            <div className="p-7 relative">
                <TrophyIcon height={80} className="mx-auto mb-5 text-warning" strokeWidth={0.5}/>
                <p className="mb-1">
                    New Personal Best!
                </p>
                
                <p className="mb-3 text-5xl text-warning font-black brightness-125">
                    <GlowText text={formatNumber(score)} />
                </p> 

                <p className="mb-5 text-white/60">{track.name} ({submitted.class}-Class)</p>

                <div className="relative overflow-hidden rounded-xl">
                    <button 
                        onClick={() => continueBtn()} className="flex items-center justify-center gap-2 px-5 py-3 glow-button hover:brightness-125 transition-all w-full rounded-xl">
                        <CheckIcon height={20} strokeWidth={4} /> Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PersonalBestBox;