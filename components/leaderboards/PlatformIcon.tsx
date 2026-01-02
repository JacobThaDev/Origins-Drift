import { GamingPlatform } from "@/utils/types/PlatformsTypes";
import { PlaystationIcon } from "../icons/PlaystationIcon";
import { SteamIcon } from "../icons/SteamIcon";
import { WindowsIcon } from "../icons/WindowsIcon";
import { XboxIcon } from "../icons/XboxIcon";

const PlatformIcon = ({ platform }: { platform: GamingPlatform|undefined|null }) => {

    if (platform == undefined) {
        return null;
    }

    switch(platform) {
        case "STEAM": 
            return <SteamIcon height={28} className="text-white/30"/>;
        case "WINDOWS": 
            return <WindowsIcon height={28} className="text-white/30"/>;
        case "PLAYSTATION": 
            return <PlaystationIcon height={28} className="text-white/30"/>;
        case "XBOX": 
            return <XboxIcon height={28} className="text-white/30"/>;
    }

    return null;
}

export default PlatformIcon;