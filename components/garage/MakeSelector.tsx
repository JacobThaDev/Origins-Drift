"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface MakeSelectorTypes {
    makes: string[],
    activeIdx: number;
    setActiveIdx: (arg1:number) => void;
}

const MakeSelector = ({ makes, activeIdx, setActiveIdx } : MakeSelectorTypes) => {
    
    const previous = () => {
        let current = activeIdx;

        if (current - 1 < 0)
            current = makes.length - 1;
        else
            current = current - 1;

        setActiveIdx(current);
    }

    const next = () => {
        let current = activeIdx;

        if (current + 1 > makes.length - 1)
            current = 0;
        else
            current = current + 1;

        setActiveIdx(current);
    }

    return (
        <div className="flex items-stretch gap-0.5 mb-10">
            <button 
                onClick={(e:any) => previous()} 
                className="bg-button hover:bg-buttonHover min-w-[60px] max-w-[60px] flex items-center justify-center py-3 rounded-l-lg">
                <ChevronLeftIcon height={20}/>
            </button>
            
            <select name="manufacturer"
                className="custom-select px-5 bg-button hover:bg-buttonHover outline-none w-full lg:w-[200px] truncate"
                onChange={(e:any) => setActiveIdx(e.target.selectedIndex)}
                value={makes.length == 0 || !makes ? undefined : makes[activeIdx]}>

                {makes && makes.map((carmake:string, index:number) => {
                    return(
                        <option key={index} value={carmake}>
                            {carmake}
                        </option>
                    )
                })}
            </select>

            <button
                onClick={(e:any) => next()} 
                className="bg-button hover:bg-buttonHover  min-w-[60px] max-w-[60px] flex items-center justify-center py-3 rounded-r-lg">
                <ChevronRightIcon height={20}/>
            </button>
        </div>
    )
}

 export default MakeSelector;