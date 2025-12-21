import { DiscordIcon } from "@/components/icons/DiscordIcon";
import Container from "@/components/layout/Container";
import ProfileFields from "@/components/profile/ProfileFields";
import LocalApi from "@/services/LocalApi";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Profile() {

    const header = await headers();

    const userData:UsersTypes = await LocalApi.get("/profile", {
        headers: {
            cookie: header.get("cookie")
        },
    }).then(r => r.data);

    let displayName = userData.name;

    if (userData.AccountData) {
        if (userData.AccountData.display_name) {
            displayName = userData.AccountData.display_name;
        }
    }

    return (
        <>
            <div className={`bg-header bg-black w-full min-h-[350px] max-h-[350px] lg:min-h-[400px] lg:max-h-[400px] pt-36 flex justify-center items-center text-white`}/>

            <Container>
                <div className="flex relative gap-7 items-start">
                    <div className="mt-[-82px]">
                        <Image unoptimized src={userData.image} width={175} height={175} alt="" 
                            className="rounded-full p-3 bg-background"/>
                        </div>
                    <div>
                        <div className="mt-[-70px] mb-10">
                            <p className="text-3xl font-bold">{displayName}</p>
                            <p className="text-white/70 text-sm">Joined {new Date(userData.createdAt).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                            <div className="flex items-center mb-5">
                                <Link 
                                    href={`https://discord.com/users/${userData.Account.accountId}`} 
                                    target="_blank"
                                    rel="nofollow"
                                    className="w-12 h-12 p-2 bg-card hover:bg-infodark rounded-full inline-flex items-center justify-center">
                                    <DiscordIcon height={24} />
                                </Link>
                            </div>
                            
                            <ProfileFields userData={userData}/>
                        </div>
                    </div>
                </div>
            </Container>
            
        </>
    );

}