"use client";

import { GarageContextTypes, useGarageContext } from "@/providers/GarageProvider";
import LocalApi from "@/services/LocalApi";
import { capitalize, formatNumber } from "@/utils/Functions";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface SidebarTypes {
    details: CarsDetailsTypes;
    setDetails: (arg1:CarsDetailsTypes|undefined) => void;
    detailType: "basic"|"advanced";
    setDetailType: (arg1:"basic"|"advanced") => void;
}

const CarDetailsSidebar = ({ details, setDetails, setDetailType, detailType }: SidebarTypes) => {
    console.log(details);

    const { loadGarage, loading }:GarageContextTypes = useGarageContext();
    const [ adding, setAdding ] = useState<boolean>(false);

    const addCar = async(car:CarsDetailsTypes) => {
        setAdding(true);

        try {
            const result = await LocalApi.post("/garage/add", { 
                car_id: car.id
            });

            if (result.success) {
                await loadGarage();
                setAdding(false);
            }
        } catch (err:any) {
            console.log(err);
        }
    }

    const drivetrain = details.drivetrain == 'rear-wheel drive' ? 'rwd' :
                       details.drivetrain == 'front-wheel drive' ? 'fwd' : 'awd';

    return(
        <div className="fixed left-0 top-0 h-full z-[1001] w-full">
            <div className="absolute top-0 w-[100vw] h-full backdrop-blur-sm"
                onClick={() => setDetails(undefined)}/>

            <div className="bg-card overflow-hidden relative h-full min-w-[300px] max-w-[300px] flex flex-col">

                <div className="px-10 relative flex flex-col items-center justify-center w-full h-[150px] min-h-[150px] overflow-hidden bg-secondary">
                    <p className="text-sm font-black text-white/10 text-center">
                        {details?.make}
                    </p>
                    <p className="text-xl font-black text-white/40 text-center">
                        {details?.model ?? "Select a Car"}
                    </p>
                </div>

                <div className="mb-5">
                    {details.rarity.toLowerCase() == "common" && 
                    <div className={`bg-common text-uppercase font-bold text-center py-2`}>
                        {capitalize(details?.rarity)}
                    </div>}
                    
                    {details.rarity.toLowerCase() == "rare" && 
                    <div className={`bg-rare text-uppercase font-bold text-center py-2`}>
                        {capitalize(details?.rarity)}
                    </div>}

                    {details.rarity.toLowerCase() == "epic" && 
                    <div className={`bg-epic text-uppercase font-bold text-center py-2`}>
                        {capitalize(details?.rarity)}
                    </div>}

                    {details.rarity.toLowerCase() == "legendary" && 
                    <div className={`bg-legendary text-uppercase font-bold text-center py-2`}>
                        {capitalize(details?.rarity)}
                    </div>}
                </div>

                <div className="flex items-center justify-center gap-3 text-sm bg-button w-[80px] mx-auto p-2 rounded-lg mb-5">
                    <p>{details.car_class}-{details.rating}</p>
                </div>

                <div className="flex items-stretch justify-center">
                    <button className="p-4" onClick={() => setDetailType(detailType == "advanced" ? "basic" : "advanced")}>
                        <ChevronLeftIcon height={20}/>
                    </button>
                    <button className="w-[100px]" onClick={() => setDetailType(detailType == "advanced" ? "basic" : "advanced")}>
                        {capitalize(detailType)}
                    </button>
                    <button className="p-4" onClick={() => setDetailType(detailType == "advanced" ? "basic" : "advanced")}>
                        <ChevronRightIcon height={20}/>
                    </button>
                </div>

                

                {detailType == "basic" && <>
                    <div className="flex flex-col gap-1 py-3 px-7 h-full overflow-y-auto scrollbar mx-3">
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-muted">Speed</div>
                            <div>{details.speed}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-muted">Handling</div>
                            <div>{details.handling}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-muted">Acceleration</div>
                            <div>{details.acceleration}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-muted">Launch</div>
                            <div>{details.launch}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-muted">Braking</div>
                            <div>{details.braking}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-muted">Offroad</div>
                            <div>{details.offroad}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-muted">Price</div>
                            <div>{formatNumber(details.price)} cr</div>
                        </div>
                    </div>
                </>}

                {detailType == "advanced" && <>
                    <div className="flex flex-col gap-1 py-3 px-7 h-full overflow-y-auto scrollbar mx-3">
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">Power</div>
                            <div>{formatNumber(details.power, 0)} HP</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">Torque</div>
                            <div>{formatNumber(details.torque, 0)} ft-lb</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">Drivetrain</div>
                            <div>{drivetrain.toUpperCase()}</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">Weight</div>
                            <div>{formatNumber(details.weight, 0)} lbs</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">Front</div>
                            <div>{formatNumber(details.weight_distribution * 100, 0)} %</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">Engine</div>
                            <div>{details.engine_size}L {details.engine_type}</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">Placement</div>
                            <div>{details.engine_placement}</div>
                        </div>

                        <hr className="w-[100px] mx-auto my-3 border-button"/>

                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">Top Speed</div>
                            <div>{details.top_speed} mph</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">0-60mph</div>
                            <div>{details.A60 ?? "unknown"}s</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">0-100mph</div>
                            <div>{details.A100 ? details.A100+"s" : "unknown"}</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">60-0mph</div>
                            <div>{details.B60 ? details.B60+" ft." : "unknown"}</div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <div className="font-bold text-muted">100-0mph</div>
                            <div>{details.B100 ? details.B100+" ft." : "unknown"}</div>
                        </div>
                    </div>

                    
                </>}

                <button className="bg-gradient py-5 disabled:opacity-30"
                    onClick={() => addCar(details)}
                    disabled={loading || adding}>
                    Add to garage
                </button>
            </div>
        </div>
    )
}

export default CarDetailsSidebar;