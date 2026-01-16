import { capitalize } from "@/utils/Functions";
import { DiscordUserRoleTypes } from "@/utils/types/discord/DiscordUserRoleTypes";
import { DiscordUserTypes } from "@/utils/types/discord/DiscordUserTypes";

import Image from "next/image";
import Link from "next/link";
import PlatformIcon from "../leaderboards/PlatformIcon";
import PlatformLink from "../leaderboards/PlatformLink";
import Particles from "../misc/Particles";
import { ProfileCardIcon } from "../icons/ProfileCardIcon";

const MembersCard = ({ member }: { member:DiscordUserTypes}) => {
    
    const filtered_roles = member.roles.filter(
        (role:DiscordUserRoleTypes) => role.id != "1457943745055035414");

    const isLeader = filtered_roles.map((role:DiscordUserRoleTypes) => role.id).includes("1461604022913073152");
    const isCoLeader = filtered_roles.map((role:DiscordUserRoleTypes) => role.id).includes("1326377562963710097");

    return(
        <div className={`${isLeader ? "bg-danger/20" : (isCoLeader ? "bg-warning/20" : "bg-card")} relative rounded-xl p-3 px-5 w-full overflow-hidden`}>
            {(isLeader || isCoLeader) && <Particles className="absolute w-full" quantity={50}/>}
            
            <div className="flex items-center gap-5 relative">
                <div className="relative">
                    <Image src={member.avatar_url} 
                        unoptimized
                        width={54} 
                        height={54} 
                        alt="" 
                        className="rounded-full border-[5px] border-background mx-auto min-w-[54px]"/>

                    
                    {member.account?.AccountData && 
                        <div className="absolute bottom-0 right-0 bg-background rounded-full p-0.5">
                            <PlatformLink 
                                    platform={member.account.AccountData.platform}
                                    platformName={member.account.AccountData.platform_name}>
                                <PlatformIcon platform={member.account.AccountData.platform} size={20} />
                            </PlatformLink>
                        </div>
                    }
                </div>

                <div className="flex flex-col gap-0.5 relative"> 
                    <p className="text-lg font-bold text-nowrap">{member.displayName}</p>

                    <div className="flex gap-1 text-white/60 text-xs text-nowrap truncate max-w-[150px] text-ellipsis">
                        {filtered_roles.map((role:DiscordUserRoleTypes, index:number) => {
                            return(
                                <span key={`user-role-${index}`}>
                                    {capitalize(role.name)} {index == filtered_roles.length - 1 ? "" : "|"}
                                </span>
                            )
                        })}
                    </div>
                </div>

                {member.account && <div className="flex items-center justify-end ml-auto">
                    <Link href={`/profile/${member.id}`} 
                        className="text-lg font-bold text-warning text-nowrap inline-block">
                        <ProfileCardIcon height={30}/>
                    </Link>
                </div>}
            </div>
        </div>
    )
}

export default MembersCard;