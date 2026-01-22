"use client"

import { ExclamationCircleIcon, } from "@heroicons/react/24/outline";

const DesktopInstructions = () => {

    /*const steps:StepTypes[] = [
        {
            title: "Open Forza Horizon 5",
            message: "Launch the game on your PC through Steam, Microsoft Store, or Xbox app.",
            icon: <GamePadIcon height={22} strokeWidth={1.5}/>
        }
    ];*/

    return(
        <>  
            <div className={`flex items-center gap-6 border-[1px] rounded-xl p-6  bg-warning/10 border-warning/30 hover:border-warning/60`}>
            <div className={`flex flex-shrink-0 items-center justify-center w-14 h-14 rounded-full border-[1px] border-warning/30 bg-warning/10`}>
                
                    <ExclamationCircleIcon 
                        height={24} 
                        strokeWidth={2} 
                        className="text-warning"/>
                
                <p className="font-black text-2xl text-info">
                    
                </p>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-lg font-bold mb-1">
                    Instructions in Discord
                </p>
                <p className="text-muted mb-3">
                    Due to Microsoft removing the group feature from the XBox app, 
                    instructions may be a bit difficult, so we advise 
                    contacting one of us on how to join.
                </p>

                <p>This may change with the release of Forza Horizon 6.</p>
            </div>
        </div>
        </>
    )
}

/*interface StepTypes {
    title: string;
    message:string;
    ending?: boolean;
    icon?:any
}*/

export default DesktopInstructions;