import Link from "next/link";
import { DiscordIcon } from "../icons/DiscordIcon";
import Container from "../layout/Container";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { GithubIcon } from "../icons/GithubIcon";
import SignInButton from "./SignInButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "./SignOutButton";
import ProfileButton from "./ProfileButton";

const SocialBar = async() => {

    const DISCORD_URL  = process.env.NEXT_PUBLIC_DISCORD_URL as string;
    const YOUTUBE_URL  = process.env.NEXT_PUBLIC_YOUTUBE_URL as string;
    const GITHUB_URL   = process.env.NEXT_PUBLIC_GITHUB_URL as string;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    return(
        <div className="py-3 bg-black/40 z-[1000] absolute top-0 left-0 w-full backdrop-blur">
            <Container>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {DISCORD_URL != undefined && 
                        <Link href={DISCORD_URL} 
                            target="_blank" 
                            rel="nofollow" 
                            className={`hover:text-discord transition-all hover:scale-125`}>
                             <DiscordIcon height={20} />
                        </Link>}

                        {YOUTUBE_URL != undefined && 
                        <Link href={YOUTUBE_URL} 
                            target="_blank" 
                            rel="nofollow" 
                            className={`hover:text-youtube transition-all hover:scale-125`}>
                             <YoutubeIcon height={20} />
                        </Link>}
                        
                        {GITHUB_URL != undefined && 
                        <Link href={GITHUB_URL} 
                            target="_blank" 
                            rel="nofollow" 
                            className={`hover:text-black transition-all hover:scale-125`}>
                             <GithubIcon height={20} />
                        </Link>}
                    </div>

                    <div className="flex gap-3 items-center">
                        {session ? 
                        <>
                            <ProfileButton session={session} />
                            <SignOutButton /> 
                        </>
                        : <SignInButton />}
                    </div>
                </div>
            </Container>
        </div>
    )
}


export default SocialBar;