import { PlusIcon } from "@heroicons/react/24/outline";
import Meteors from "../misc/Meteors";

const SubmitButton = () => {
    return(
        <>
        <button 
            className="relative overflow-hidden inline-block text-center bg-infodark/70 hover:bg-infodark w-full rounded-xl transition-all duration-500 mb-3">
            <Meteors />

            <div className="flex items-center gap-3">
                <p className="text-white transition-all duration-500 font-bold text-center w-full">
                    Add New Score
                </p>
                <div className=" bg-black/20 min-w-[60px] h-[60px] flex items-center justify-center ml-auto">
                    <PlusIcon height={24} />
                </div>
            </div>
        </button>
        </>
    )
}

export default SubmitButton;