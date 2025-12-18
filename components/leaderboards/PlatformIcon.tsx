import { PlaystationIcon } from "../icons/PlaystationIcon";
import { SteamIcon } from "../icons/SteamIcon";
import { WindowsIcon } from "../icons/WindowsIcon";
import { XboxIcon } from "../icons/XboxIcon";

const PlatformIcon = ({ platform }: { platform: string|undefined }) => {

    if (platform == undefined) {
        return null;
    }

    switch(platform) {
        case "STEAM": 
            return <SteamIcon height={28} className="text-white/30"/>;
        case "WINDOWS": 
            return <WindowsIcon height={28} className="text-white/30"/>;
        case "PS": 
            return <PlaystationIcon height={28} className="text-white/30"/>;
        case "XBOX": 
            return <XboxIcon height={28} className="text-white/30"/>;
    }

    return null;
}

export default PlatformIcon;