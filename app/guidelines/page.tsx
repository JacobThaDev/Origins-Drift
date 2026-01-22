"use client"

import RuleCard from "@/components/guidelines/RuleCard";
import { UsersIcon } from "@/components/icons/UsersIcon";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import GlowText from "@/components/misc/GlowText";
import { ArrowRightIcon, BoltIcon, ChatBubbleLeftIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, HeartIcon, ShieldExclamationIcon, TrophyIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Guidelines() {

    return (
        <>
            <PageHeader gradient={true}>
                <>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 border border-info/20 mb-8">
                        <div>
                            <ShieldExclamationIcon height={18} className="text-info" strokeWidth={2}/>
                        </div>
                        <span className="text-sm font-medium text-info">Club Guidelines</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-6xl font-black tracking-tight text-foreground mb-6 text-balance">
                        The Code of the <GlowText enableGlow={false} text="Drift"/>
                    </h1>

                    <p className="max-w-3xl text-muted text-lg md:text-xl text-muted-foreground mx-auto mb-10 leading-relaxed text-pretty">
                        Every great drift club runs on respect, skill, and good vibes. Follow these rules to keep Origins the best drifting community in Forza Horizon.
                    </p>

                    <div className="inline-flex items-center gap-4 text-warning rounded-xl bg-warning/10 p-4 border-2 border-warning/50 bg-card">
                        <ExclamationTriangleIcon strokeWidth={2} height={20}/>
                        <p>Breaking rules may result in removal from the club</p>
                    </div>
                </>
            </PageHeader>

            <div className="py-24">
                <Container>
                    <div className="text-center mb-10">
                        <p className="text-3xl md:text-4xl tracking-tight font-black mb-5">
                            8 Rules to Live By
                        </p>
                        <p className="max-w-xl mx-auto text-muted">
                            Simple guidelines that keep our community thriving. Follow these and you&apos;ll fit right in.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                        <RuleCard
                            number={1}
                            title="Respect all Drivers"
                            message="Treat every member with respect regardless of skill level. We all started somewhere. No toxicity, harassment, or discrimination tolerated."
                            color="info"
                            icon={<UsersIcon height={28} strokeWidth={1.5} />} />

                        <RuleCard
                            number={2}
                            title="No Ramming or Griefing"
                            message="Intentional ramming, blocking, or disrupting other drivers during drift sessions is strictly prohibited. Keep it clean on the track."
                            color="success"
                            icon={<ShieldExclamationIcon height={28} strokeWidth={1.5} />} />

                        <RuleCard
                            number={3}
                            title="Keep Chat Friendly"
                            message="Whether in-game or on Discord, keep conversations positive. No spam, NSFW content, or excessive self-promotion."
                            color="purple"
                            icon={<ChatBubbleLeftIcon height={28} strokeWidth={1.5} />} />

                        <RuleCard
                            number={4}
                            title="Fair Competition"
                            message="Submit only legitimate scores. No exploits, glitches, or cheating of any kind. We verify scores and cheaters get permanently banned."
                            color="warning"
                            icon={<TrophyIcon height={28} strokeWidth={1.5} />} />

                        <RuleCard
                            number={5}
                            title="Share Your Clips"
                            message="We love seeing your best drifts! Share clips and screenshots in the appropriate channels. Tag the club when posting on social media."
                            color="green"
                            icon={<VideoCameraIcon height={28} strokeWidth={1.5} />} />

                        <RuleCard
                            number={6}
                            title="No Hate Speech"
                            message="Zero tolerance for racist, sexist, homophobic, or any discriminatory language. This is an inclusive community for all drifters."
                            color="danger"
                            icon={<BoltIcon height={28} strokeWidth={1.5} />} />

                        <RuleCard
                            number={7}
                            title="Help New Members"
                            message="If you see someone struggling, offer tips or guidance. We grow stronger together. Everyone deserves a chance to improve."
                            color="danger"
                            icon={<HeartIcon height={28} strokeWidth={1.5} />} />

                        <RuleCard
                            number={8}
                            title="Stay Active"
                            message="Inactive members may be removed to make room for active drifters. Participate in events, submit scores, or just hang out with us!"
                            color="warning"
                            icon={<BoltIcon height={28} strokeWidth={1.5} />} />
                    </div>


                    <div className={`bg-card mb-20 relative border-2 border-border p-6 rounded-2xl text-center py-10 mx-auto `}>
                        <ExclamationCircleIcon height={60}
                            className="mx-auto text-danger mb-5"/>
                                
                        <p className="font-bold text-2xl mb-4">
                            Car Restrictions
                        </p>

                        <p className="text-muted max-w-4xl mx-auto text-lg mb-5">
                            All cars regardless of class must be <strong>real-wheel drive</strong> on treaded tires. 
                            <br/>Stock, street, racing &#40;non slick&#41;, or drift tire compound only.
                        </p>

                        <div className="inline-flex items-center gap-4 text-warning rounded-xl bg-warning/10 p-4 border-2 border-warning/50 bg-card">
                            <ExclamationTriangleIcon strokeWidth={2} height={20}/>
                            <p>Using drag/slicks or driving all-wheel drive in online drifting will result in immediate removal.</p>
                        </div>
                    </div>

                    <div className={`bg-info/5 relative border-[1px] border-info/30 p-6 rounded-2xl text-center py-10 max-w-4xl mx-auto `}>
                        <div className={`w-20 h-20 border-info/30 bg-info/20 text-info border-2 flex items-center justify-center rounded-full mx-auto mb-10`}>
                            <CheckCircleIcon height={38} strokeWidth={2} />
                        </div>
                                
                        <p className="font-bold text-4xl mb-4">
                            Ready to <span className="italic text-info">Drift</span> With Us?
                        </p>

                        <p className="text-muted max-w-2xl mx-auto text-lg mb-10">
                            By joining Origins Drift Club, you agree to follow these rules and be a positive member of our community. Let&apos;s make some tire smoke together!
                        </p>

                        <div className="flex gap-6 justify-center">
                            <Link href="/join" className="bg-info hover:bg-info/80 text-black rounded-lg px-6 py-3 font-bold inline-flex items-center gap-6">
                                Join the Club
                                <ArrowRightIcon height={16} />
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

            
        </>
    );

}