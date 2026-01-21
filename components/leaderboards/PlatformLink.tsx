import { getPlatformLink } from "@/utils/Functions";
import { GamingPlatform } from "@/utils/types/PlatformsTypes";
import Link from "next/link";

const PlatformLink = ({ platform, platformName, children }: { platform:GamingPlatform|null, platformName:string|null, children?: any }) => {

    const platformLink = getPlatformLink(platform, platformName);

    if (platformLink) {
        return (
            <Link target="_blank"
                rel="nofollow" 
                href={platformLink}>
                {children}
            </Link>
        )
    }

    return null;
}

export default PlatformLink;