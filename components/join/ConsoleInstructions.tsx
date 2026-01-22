"use client"

import { ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GamePadIcon } from "../icons/GamePadIcon";
import InstructionCard from "./InstructionCard";

const ConsoleInstructions = () => {

    const steps:StepTypes[] = [
        {
            title: "Open Forza Horizon 5",
            message: "Launch the game on your Xbox or PlayStation console.",
            icon: <GamePadIcon height={22} strokeWidth={1.5}/>
        },
        {
            title: "Open the Pause Menu",
            message: "Press the Menu/Options button to open the pause menu while in free roam.",
            icon: <ChevronRightIcon height={22} strokeWidth={1.5}/>
        },
        {
            title: "Navigate to Online",
            message: "Use your controller to select the 'Online' tab from the menu.",
            icon: <ChevronRightIcon height={22} strokeWidth={1.5}/>
        },
        {
            title: "Select Find Clubs",
            message: "Scroll down and choose 'Find Clubs' from the online options.",
            icon: <MagnifyingGlassIcon height={22} strokeWidth={1.5}/>
        },
        {
            title: "Search for \"Origins\"",
            message: "Use the on-screen keyboard to search for 'Origins' or 'ODC'.",
            icon: <MagnifyingGlassIcon height={22} strokeWidth={1.5}/>
        },
        {
            title: "Request to Join",
            message: "Highlight Origins Drift Club and press A/X to request membership.",
            icon: <MagnifyingGlassIcon height={22} strokeWidth={1.5}/>
        },
        {
            title: "You're In!",
            message: "Once accepted, you'll have access to club events and can submit your drift scores.",
            ending: true
        }
    ];

    return(
        <>
            {steps.map((step:StepTypes, index:number) => {
                return(
                    <InstructionCard
                        step={index + 1}
                        title={step.title}
                        message={step.message}
                        ending={step.ending}
                        icon={step.icon}/>
                )
            })}
        </>
    )
}

interface StepTypes {
    title: string;
    message:string;
    ending?: boolean;
    icon?:any
}

export default ConsoleInstructions;