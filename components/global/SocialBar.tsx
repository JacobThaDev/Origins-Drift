import Link from "next/link";
import { DiscordIcon } from "../icons/DiscordIcon";
import Container from "../layout/Container";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { FacebookIcon } from "../icons/FacebookIcon";

const SocialBar = () => {

    const DISCORD_URL  = process.env.NEXT_PUBLIC_DISCORD_URL as string;
    const YOUTUBE_URL  = process.env.NEXT_PUBLIC_YOUTUBE_URL as string;
    const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL as string;

    return(
        <div className="py-3 bg-black/40 z-[1000] absolute top-0 left-0 w-full backdrop-blur">
            <Container>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {DISCORD_URL != "" && 
                        <SocialButton url={DISCORD_URL} color="discord">
                           <DiscordIcon height={20} />
                        </SocialButton>}

                        {YOUTUBE_URL != "" && 
                        <SocialButton url={YOUTUBE_URL} color="youtube">
                           <YoutubeIcon height={20} />
                        </SocialButton>}

                        {FACEBOOK_URL != "" && 
                        <SocialButton url={FACEBOOK_URL} color="facebook">
                           <FacebookIcon height={20} />
                        </SocialButton>}
                    </div>

                    <div className="flex gap-3 items-center">
                        <Link href="/download" className="bg-warning/30 hover:bg-warning/70 transition-all px-5 rounded-lg py-2">
                            Submit PB
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

const SocialButton = ({ children, url, color }: {
    url: string;
    children?: React.ReactNode;
    color?:"youtube"|"discord"|"facebook";
}) => {

    if (color == "discord") {
        return(
            <Link href={url} 
                target="_blank" 
                rel="nofollow" 
                className={`hover:text-discord transition-all hover:scale-125`}>
                {children}
            </Link>
        )
    }

    if (color == "youtube") {
        return(
            <Link href={url} 
                target="_blank" 
                rel="nofollow" 
                className={`hover:text-youtube transition-all hover:scale-125`}>
                {children}
            </Link>
        )
    }

     if (color == "facebook") {
        return(
            <Link href={url} 
                target="_blank" 
                rel="nofollow" 
                className={`hover:text-facebook transition-all hover:scale-125`}>
                {children}
            </Link>
        )
    }

    return(
        <Link href={url} target="_blank" rel="nofollow" 
            className={`hover:text-white transition-all hover:scale-125`}>
            {children}
        </Link>
    )
}

export default SocialBar;