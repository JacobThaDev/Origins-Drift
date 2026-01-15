import { formatNumber } from "@/utils/Functions";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";

interface ScoreSavedBoxTypes {
    track: TracksTypes;
    loading: boolean;
    data: LeadersTypes;
    continueBtn: () => void;
}

const ScoreSavedBox = ({ track, loading, data, continueBtn }: ScoreSavedBoxTypes) => {
    return(
        <>
        <div className="text-center p-7">
            <CheckCircleIcon height={80} className="mx-auto mb-5 text-success"/>
            <p className="text-white/60">
                Score saved! 
            </p>

            <p className="mb-3 text-xl">{track.name} ({data.class}-Class)</p> 

            <p className="text-3xl font-black mb-5">
                {formatNumber(data.score, 0)}
            </p>

            <button 
                disabled={loading}
                onClick={() => continueBtn()} className="flex items-center justify-center gap-2 px-5 py-3 bg-success/70 hover:bg-success  transition-all w-full rounded-xl">
                <CheckIcon height={20} strokeWidth={4} /> Continue
            </button>
        </div>
        </>
    )
}

export default ScoreSavedBox;