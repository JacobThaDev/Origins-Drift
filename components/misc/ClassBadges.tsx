export const ClassABadge = () => {
    return(
        <div className="flex rounded-lg w-[100px] h-[36px] border-2 border-danger bg-[#69211F] font-black overflow-hidden">
            <div className="min-w-[46px] flex items-center justify-center border-[#69211F] border-[3px] rounded-md bg-danger">
                A
            </div>
            <div className="bg-[#69211F] w-full flex items-center justify-center">
                800
            </div>
        </div>
    )
}

export const ClassS1Badge = () => {
    return(
        <div className="flex rounded-lg w-[100px] h-[36px] overflow-hidden border-2 border-[#69459C] bg-[#34224E] font-black">
            <div className="min-w-[46px] flex items-center justify-center border-[#34224E] border-[3px] rounded-md bg-[#69459C]">
                S1
            </div>
            <div className="bg-[#34224E] w-full flex items-center justify-center">
                900
            </div>
        </div>
    )
}