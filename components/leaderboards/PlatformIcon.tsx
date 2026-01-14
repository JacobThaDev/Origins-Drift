import { GamingPlatform } from "@/utils/types/PlatformsTypes";
import { PlaystationIcon } from "../icons/PlaystationIcon";
import { SteamIcon } from "../icons/SteamIcon";
import { XboxIcon } from "../icons/XboxIcon";

const PlatformIcon = ({ platform }: { platform: GamingPlatform|undefined|null }) => {

    if (platform == undefined) {
        return null;
    }

    switch(platform) {
        case "STEAM": 
            return <SteamIcon height={26} />;
        case "WINDOWS": 
            return (<div className="relative w-8 h-8">
                <XboxIcon height={32} />
                <div className="absolute font-black bg-black rounded-full text-[9px] h-[14px] w-[20px] -bottom-[3px] left-1/2 ml-[-10px] flex items-center justify-center">
                    PC
                </div>
            </div>);
        case "PLAYSTATION": 
            return <PlaystationIcon height={32} />;
        case "XBOX": 
            return <XboxIcon height={32} />;
    }

    return null;
}

export default PlatformIcon;