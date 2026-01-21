'use client'
import { XMarkIcon } from "@heroicons/react/24/outline";

const LoadingBox = ({ message }: { message:string }) => {
    return(
        <div className="fixed top-0 left-0 bg-background w-full h-full flex flex-col gap-10 items-center justify-center z-[1050]">
            <div className="w-[100px] h-[100px] flex items-center justify-center border-2 border-dashed border-info/20 rounded-full animate-spin [animation-duration:30s] duration-500">
                <div className="w-[80px] h-[80px] border-[4px] border-dashed animate-spin-reverse flex border-info/70 items-center justify-center [animation-duration:20s] rounded-full">
                    <XMarkIcon height={30} className="animate-spin text-info"/>
                </div>
            </div>
            <div className="text-center">
                <p className="text-muted text-sm mb-3">
                    Please wait
                </p>
                <p className="text-2xl font-bold">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default LoadingBox;