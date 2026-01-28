import PageHeader from "../layout/PageHeader";
import Link from "next/link";
import { getAvatar, getPlatformLink, getPlatformName } from "@/utils/Functions";
import Image from "next/image";
import PlatformIcon from "../leaderboards/PlatformIcon";
import { DiscordIcon } from "../icons/DiscordIcon";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";

const PublicProfileHeader = ({ member } : { member:UsersTypes|undefined }) => {

    if (!member) {
        return null;
    }
    
    const platform = member.AccountData?.platform;
    const platform_name = member.AccountData?.platform_name;

    const platformLink = (platform && platform_name) && getPlatformLink(platform, platform_name) || null;

    return(
            <PageHeader gradient={true}>
                <>
                <div className="relative max-w-full text-start">
                    <div className="flex flex-col md:flex-row-reverse gap-10">
                        <div className="min-w-[200px]">
                            <Image
                                unoptimized
                                src={getAvatar(member.discord.user.id, member.discord.user.avatar)}
                                width={200} 
                                height={200}
                                className="rounded-full border-[6px] border-border hover:border-info w-full max-w-[200px]"
                                alt="" />
                        </div>
                        <div className="flex w-full flex-col gap-10 lg:flex-row lg:justify-between">
                            <div className="w-full max-w-2xl">
                                <div className="flex items-center gap-2 mb-3">
                                    {member.discord.roles.includes("1461604022913073152") && 
                                        <div className="bg-danger/10 text-danger border-2 border-danger/20 px-2 py-1 text-sm inline-block rounded-lg mb-3">
                                            Leader
                                        </div>
                                    }
                                    {member.discord.roles.includes("1326377562963710097") && 
                                        <div className="bg-warning/10 text-warning border-2 border-warning/20 px-2 py-1 text-sm inline-block rounded-lg mb-3">
                                            Co-Leader
                                        </div>
                                    }
                                    {member.discord.roles.includes("1326527827008421918") && 
                                        <div className="bg-info/10 text-info border-2 border-info/20 px-2 py-1 text-sm inline-block rounded-lg mb-3">
                                            Club Member
                                        </div>
                                    }
                                </div>

                                <p className="text-4xl lg:text-6xl font-bold mb-3 tracking-tight">
                                    {member.discord.nick || member.discord.user.global_name || member.discord.user.username} | Drift Profile
                                </p>
                                <p className="text-white/60 mb-7">
                                    {member.AccountData?.about_me}
                                </p>

                                <div className="flex items-center gap-3 text-white/60 mb-7">
                                    <CalendarDateRangeIcon height={18} strokeWidth={2} />
                                    <p>
                                        Member since {new Date(member.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex flex-col md:flex-row gap-5 gap-y-3">
                                    <Link href={`https://discord.com/users/${member.Account.accountId}`} 
                                        target="_blank"
                                        className="px-5 py-3 border-2 border-border hover:bg-info hover:border-info text-white hover:text-black rounded-lg font-semibold flex items-center gap-5 transition-all">
                                        <DiscordIcon height={20} />
                                        <div className="w-[1px] h-[30px] bg-border"></div>
                                        Discord
                                    </Link>

                                    {(platform && platform_name && platformLink) && 
                                    <>
                                        <Link href={platformLink} 
                                            target="_blank"
                                            className="px-5 py-3 border-2 border-border hover:bg-info hover:border-info text-white hover:text-black rounded-lg font-semibold flex items-center gap-5 transition-all">
                                            <PlatformIcon platform={platform} size={24}/>

                                            <div className="w-[1px] h-[30px] bg-border"></div>
                                            {getPlatformName(platform)}
                                        </Link>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            </PageHeader>
    )
}

export default PublicProfileHeader;