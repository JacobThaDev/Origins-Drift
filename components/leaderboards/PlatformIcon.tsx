import { GamingPlatform } from "@/utils/types/PlatformsTypes";
import { PlaystationIcon } from "../icons/PlaystationIcon";
import { SteamIcon } from "../icons/SteamIcon";
import { XboxIcon } from "../icons/XboxIcon";

const PlatformIcon = ({ platform, size=26 }: { platform: GamingPlatform|undefined|null, size?:number }) => {

    if (platform == undefined) {
        return null;
    }

    switch(platform) {
        case "STEAM": 
            return <SteamIcon height={size} />;
        case "PLAYSTATION": 
            return <PlaystationIcon height={size} />;
        case "XBOX": 
        case "WINDOWS": 
            return <XboxIcon height={size} />;
    }

}

export default PlatformIcon;