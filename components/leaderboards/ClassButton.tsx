import { SpeedIcon } from "../icons/SpeedIcon";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ClassButton = ({ track, classType } : { track:string, classType:string }) => {
    
    return(
        <Link href={`/leaderboards/${classType == "b" ? "a" : (classType == "a" ? "s1" : "b")}/${track}`} /*onClick={() => setPerfIndex(perfIndex == "b" ? "a" : (perfIndex == "a" ? "s1" : "b"))}*/
            className="inline-flex items-center gap-3 relative">
            <SpeedIcon height={18} strokeWidth={2} className="text-muted"/>
            <div className="text-white flex items-center gap-2">
                {classType.toUpperCase()}-{classType == "a" ? "700" : (classType == "b" ? "600" : "800")}
                <ArrowPathRoundedSquareIcon height={16} 
                    className="text-white/60 inline-block" 
                    strokeWidth={1.5}/>
            </div>
        </Link>
    )
}

export default ClassButton;