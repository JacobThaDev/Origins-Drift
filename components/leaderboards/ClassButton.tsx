import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { SpeedIcon } from "../icons/SpeedIcon";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

const ClassButton = () => {

    const { perfIndex, setPerfIndex }:TracksContextTypes = useTracksContext();
    
    return(
        <button onClick={() => setPerfIndex(perfIndex == "a" ? "s1" : "a")} 
            className="inline-flex items-center gap-3 relative">
            <SpeedIcon height={18} strokeWidth={2} className="text-muted"/>
            <div className="text-white flex items-center gap-2">
                {perfIndex.toUpperCase()}-{perfIndex == "a" ? 800 : 900}
                <ArrowPathRoundedSquareIcon height={16} 
                    className="text-white/60 inline-block" 
                    strokeWidth={1.5}/>
            </div>
        </button>
    )
}

export default ClassButton;