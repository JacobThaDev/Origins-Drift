'use client';

import Link from "next/link";
import Container from "../layout/Container";
import { DiscordIcon } from "../icons/DiscordIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { HeartIcon } from "@heroicons/react/24/solid";

const PageFooter = () => {
    
    return(
        <div className="py-12 bg-card/30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-border/50 to-background border-t border-border text-muted">
            <Container>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center border border-info/30">
                                <span className="text-info font-black text-lg italic">O</span>
                            </div>
                            <span className="text-white text-xl font-bold tracking-tight">
                                {process.env.NEXT_PUBLIC_SITE_NAME}
                            </span>
                        </Link>

                        <p className="text-sm max-w-sm mb-4">
                            {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
                        </p>

                        <div className="flex items-center gap-3">
                            <Link href={process.env.NEXT_PUBLIC_DISCORD_URL} 
                                target="_blank" rel="nofollow noopener" 
                                className="w-9 h-9 rounded-lg bg-secondary hover:bg-info/20 flex items-center justify-center transition-colors">
                                <DiscordIcon height={20} className=""/>
                            </Link>
                            <Link href={process.env.NEXT_PUBLIC_GITHUB_URL} 
                                target="_blank" rel="nofollow noopener" 
                                className="w-9 h-9 rounded-lg bg-secondary hover:bg-info/20 flex items-center justify-center transition-colors">
                                <GithubIcon height={20} className=""/>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">
                            Club
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" 
                                    className="text-sm text-muted hover:text-info transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/members" 
                                className="text-sm text-muted hover:text-info transition-colors">
                                    Members
                                </Link>
                            </li>
                            <li>
                                <Link href="/#leaderboards" 
                                    className="text-sm text-muted hover:text-info transition-colors">
                                    Leaderboards
                                </Link>
                            </li>
                            <li>
                                <Link href="/join" 
                                    className="text-sm text-muted hover:text-info transition-colors">
                                    Join ODC
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="https://discord.com/channels/1228471609463930889/1327683453004677210" 
                                    target="_blank"
                                    rel="nofollow"
                                    className="text-sm text-muted hover:text-info transition-colors">
                                    Tuning Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/cars" 
                                    className="text-sm text-muted hover:text-info transition-colors">
                                    Cars DB
                                </Link>
                            </li>
                            <li>
                                <Link href="/guidelines"
                                    className="text-sm text-muted hover:text-info transition-colors">
                                    Club Guidelines
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted">
                            &copy; {new Date().getFullYear()} Origins Drift Club. Not affiliated with Microsoft 
                            or Playground Games. 
                        </p>
                        <p className="text-sm">
                            Built by hand with <HeartIcon height={16} className="text-danger inline-block"/> by{" "}
                            <Link 
                                href="https://jacobtha.dev" 
                                target="_blank" 
                                className="text-white/80 hover:text-info">
                                JacobThaDev
                            </Link>
                        </p>
                    </div>


                    <div className="flex items-center gap-5">
                        <Link href="/legal/terms" 
                            className="text-sm text-muted hover:text-info transition-colors">
                            Terms of Use
                        </Link>

                        <div className="w-[2px] h-8 bg-border"/>

                        <Link href="/legal/privacy" 
                            className="text-sm text-muted hover:text-info transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PageFooter;