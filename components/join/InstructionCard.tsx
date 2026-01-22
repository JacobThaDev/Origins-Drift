"use client"

import { CheckCircleIcon } from "@heroicons/react/24/outline";

const InstructionCard = ({ step, title, message, icon, ending }: InstructionCardTypes) => {

    return(
        <div className={`flex items-center gap-6 border-[1px] rounded-xl p-6  ${ending ? "border-green/30 bg-green/10" : "bg-card border-border hover:border-info/30"}`}>
            <div className={`flex flex-shrink-0 items-center justify-center w-14 h-14 rounded-full border-[1px] ${ending ? "border-green/30 bg-green/20" : "border-info/30 bg-info/10"} `}>
                {ending && 
                    <CheckCircleIcon 
                        height={24} 
                        strokeWidth={2} 
                        className="text-green"/>}
                
                {!ending && <p className="font-black text-2xl text-info">
                    {step}
                </p>}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-lg font-bold mb-1">
                    {title}
                </p>
                <p className="text-muted">
                    {message}
                </p>
            </div>
            {!ending && icon &&
            <div className={`text-muted flex-shrink-0 hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-secondary`}>
                {icon}
            </div>}
        </div>
    )
}

interface InstructionCardTypes {
    step: number;
    title: string;
    message: string;
    ending?:boolean;
    icon?: any;
}

export default InstructionCard;