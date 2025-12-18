export const ClassABadge = () => {
    return(
        <div className="bg-danger text-xs lg:text-sm flex rounded w-[40px] lg:w-[100px] h-[30px] overflow-hidden border-2 border-danger font-black">
            <div className="w-full max-w-[40px] flex items-center justify-center">A</div>
            <div className="bg-black/50 w-full hidden lg:flex items-center justify-center">800</div>
        </div>
    )
}

export const ClassS1Badge = () => {
    return(
        <div className="bg-[#69459C] text-xs lg:text-sm flex rounded w-[40px] lg:w-[100px] h-[30px] overflow-hidden border-2 border-[#69459C] font-black">
            <div className="w-full max-w-[40px] flex items-center justify-center">S1</div>
            <div className="bg-black/50 w-full hidden lg:flex items-center justify-center">900</div>
        </div>
    )
}