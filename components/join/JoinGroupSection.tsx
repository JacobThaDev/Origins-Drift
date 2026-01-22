"use client"

import { ComputerDesktopIcon,  } from "@heroicons/react/24/outline";
import Container from "../layout/Container";
import { useState } from "react";
import { GamePadIcon } from "../icons/GamePadIcon";
import DesktopInstructions from "./DesktopInstructions";
import ConsoleInstructions from "./ConsoleInstructions";

const JoinGroupSection = () => {

    const [ platform, setPlatform ] = useState<"pc"|"console">("console");

    return(
        <div className="pb-24">
            <Container>
                <div className="text-center mb-10">
                    <p className="text-3xl md:text-4xl tracking-tight font-black mb-5">
                        Step 2 : Join the In-Game Club
                    </p>
                    <p className="max-w-xl mx-auto text-muted">
                        After joining the Discord just come hang out with us when we&apos;re on
                        and we&apos;ll get you set up! Instructions are currently for FH5.
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-10">
                    <button onClick={() => setPlatform("pc")}
                        className={`inline-flex outline-none items-start group gap-3 text-start bg-card border-border transition-all hover:border-info/30 ${platform == "pc" && "bg-info/10 !border-info"} border-2 text-muted rounded-xl py-4 px-6`}>
                        <div className="pt-2">
                            <ComputerDesktopIcon height={32}
                                className={`group-hover:text-white/80 transition-colors ${platform == "pc" && "!text-info"}`}/>
                        </div>
                        <div>
                            <p className={`${platform == "pc" && "!text-white"} text-lg font-bold group-hover:text-white transition-colors `}>PC</p>
                            <p className={`group-hover:text-white/70 transition-colors ${platform == "pc" && "!text-white/80"}`}>Windows / Steam</p>
                        </div>
                    </button>

                    <button  onClick={() => setPlatform("console")}
                        className={`inline-flex outline-none items-start group gap-3 text-start bg-card border-border transition-all hover:border-info/50 ${platform == "console" && "bg-info/10 !border-info"} border-2 text-muted rounded-xl py-4 px-6`}>
                            <div className="pt-2">
                                <GamePadIcon height={32} strokeWidth={1.5}
                                        className={`group-hover:text-white/80 transition-colors ${platform == "console" && "!text-info"}`}/>
                            </div>
                            <div>
                                <p className={`${platform == "console" && "!text-white"} text-lg font-bold group-hover:text-white transition-colors`}>Console</p>
                                <p className={`group-hover:text-white/70 transition-colors ${platform == "console" && "!text-white/80"}`}>Xbox / Playstation</p>
                            </div>
                    </button>
                </div>

                <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                    { platform == "pc"
                        ? <DesktopInstructions/>
                        : <ConsoleInstructions/>}
                </div>
            </Container>
        </div>
    )
}

export default JoinGroupSection;