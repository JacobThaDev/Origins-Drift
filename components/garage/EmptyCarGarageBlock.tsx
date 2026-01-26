"use client";

const EmptyCarGarageBlock = () => {

    return(
        <div className="bg-card rounded-xl p-4 transition-colors">
            <div>
                <div>
                    <p className="text-muted">Empty Garage</p>
                    <p className="text-lg font-semibold">Your garage is currently empty! Browse cars below to get started.</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted">
                    
                </div>
            </div>
        </div>
    )
}

export default EmptyCarGarageBlock;