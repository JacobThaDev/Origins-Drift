import { AccountTypes } from "@/utils/types/AccountTypes";
import { DiscordMemberTypes } from "@/utils/types/discord/DiscordMemberTypes";
import PageHeader from "../layout/PageHeader";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getAvatar, getPlatformLink, getPlatformName } from "@/utils/Functions";
import Image from "next/image";
import PlatformIcon from "../leaderboards/PlatformIcon";
import { DiscordIcon } from "../icons/DiscordIcon";

const PublicProfileHeader = ({ member } :  { member: ProfileTypes }) => {

    const platform = member.account.User?.AccountData.platform;
    const platform_name = member.account.User?.AccountData.platform_name;

    const platformLink = getPlatformLink(platform, platform_name);

    return(
            <PageHeader>
                <>
                <div className="relative max-w-full text-start">
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="min-w-[160px]">
                            <Image
                                unoptimized
                                src={getAvatar(member.discord.user.id, member.discord.user.avatar)}
                                width={150} 
                                height={150}
                                className="rounded-full border-[6px] border-border hover:border-info w-full max-w-[160px]"
                                alt="" />
                        </div>
                        <div className="max-w-2xl">
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
                                {member.discord.nick || member.discord.user.global_name || member.discord.user.username}
                            </p>
                            <p className="text-white/60 mb-7">
                                {member.account.User?.AccountData.about_me}
                            </p>

                            <div className="flex items-center gap-3 text-white/60 mb-7">
                                <CalendarDateRangeIcon height={18} strokeWidth={2} />
                                <p>
                                    Joined {member.account.User && new Date(member.account.User?.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex gap-5">
                                <Link href={`https://discord.com/users/${member.account.accountId}`} 
                                    target="_blank"
                                    className="px-5 py-3 border-2 border-border hover:bg-info hover:border-info text-white hover:text-black rounded-lg font-semibold flex items-center gap-5 transition-all">
                                    <DiscordIcon height={20} />
                                    <div className="w-[1px] h-[30px] bg-border"></div>
                                    Discord Profile
                                </Link>

                                {(platform && platform_name && platformLink) && 
                                <>
                                    <Link href={platformLink} 
                                        target="_blank"
                                        className="px-5 py-3 border-2 border-border hover:bg-info hover:border-info text-white hover:text-black rounded-lg font-semibold flex items-center gap-5 transition-all">
                                        <PlatformIcon platform={platform} size={20}/>

                                        <div className="w-[1px] h-[30px] bg-border"></div>
                                        {getPlatformName(platform)} Profile
                                    </Link>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
                </>
            </PageHeader>
    )
}

interface ProfileTypes {
    account: AccountTypes,
    discord: DiscordMemberTypes,
    error?: { 
        message: string, 
        code: number 
    };
}

export default PublicProfileHeader;