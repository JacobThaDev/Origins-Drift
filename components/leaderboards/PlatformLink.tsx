import { GamingPlatform } from "@/utils/types/PlatformsTypes";
import Link from "next/link";

const PlatformLink = ({ platform, platformName, children }: { platform:GamingPlatform|null, platformName:string|null, children?: any }) => {
    
    if (platform == "XBOX" || platform == "WINDOWS") {
        return (
            <Link target="_blank"
                rel="nofollow" 
                href={`https://www.xbox.com/en-us/play/user/`+(platformName)}>
                {children}
            </Link>
        )
    } else if (platform == "STEAM") {
        return(
            <Link target="_blank" 
                className="rounded-full relative inline-flex gap-1 text-sm items-center transition"
                rel="nofollow" 
                href={`https://steamcommunity.com/id/`+(platformName)}>
                {children}
            </Link>
        )
    } else if (platform == "PLAYSTATION") {
        return(
            <Link target="_blank" 
                className="rounded-full relative inline-flex gap-1 text-sm items-center transition"
                rel="nofollow" 
                href={`https://psnprofiles.com/`+(platformName)}>
                {children}
            </Link>
        )
    }

    return null;
}

export default PlatformLink;