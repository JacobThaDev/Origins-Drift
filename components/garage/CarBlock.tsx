"use client";

import { GarageContextTypes, useGarageContext } from "@/providers/GarageProvider";
import LocalApi from "@/services/LocalApi";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import { GarageTypes } from "@/utils/types/GarageTypes";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type CarBlockTypes = {
    car: CarsDetailsTypes, 
    search: string|undefined,
    makeFilter: string|undefined
}

const CarBlock = ({ car, search, makeFilter } : CarBlockTypes) => {
    
    const { garage, setGarage }:GarageContextTypes = useGarageContext();
    const [ status, setStatus ] = useState<string>();

    if (search) {
        if ((makeFilter && makeFilter != car.make) || !car.model.toLowerCase().includes(search.toLowerCase()))
            return null;
    } else {
        if (makeFilter == null || car.make != makeFilter)
            return null;
    }

    const drivetrain_type = car.drivetrain.toLowerCase();

    const drivetrain = drivetrain_type == 'rear-wheel drive' ? 'rwd' :
        drivetrain_type == 'front-wheel drive' ? 'fwd' : 'awd';

    const inGarage = garage.filter((garage:GarageTypes) => garage.CarData.id == car.id).length > 0;

    const addCar = async(car:CarsDetailsTypes) => {
        setStatus("Adding...");
        try {
            const result = await LocalApi.post("/garage/add", { 
                car_id: car.id
            });

            if (result.success) {
                const garage_copy = garage.map(r=>r);

                garage_copy.push({
                    car_id: car.id,
                    image_url: null,
                    CarData: car
                });

                setGarage(garage_copy);
            }
        } catch (err:any) {
            console.log(err);
        }

        setStatus(undefined);
    }
    
    return (
        <button 
            onClick={() =>  addCar(car)} 
            disabled={inGarage || status != undefined}
            className="bg-card rounded-xl p-4 group text-start disabled:opacity-70">

            <div className="px-10 relative flex items-center justify-center w-full h-[150px] rounded-lg overflow-hidden mb-4 bg-secondary">
                <p className="text-3xl font-black text-white/10 text-center">
                    {inGarage ? "In Garage" : car.make}
                </p>

                {!inGarage && !status && 
                <div className="opacity-0 group-hover:opacity-100 flex transition-all absolute top-0 left-0 w-full h-full items-center justify-center">
                    <PlusCircleIcon height={70} strokeWidth={1}
                        className="text-success"/>
                </div>}
            </div>

            <div className="flex mb-3">
                <div className="truncate">
                    <p className="text-muted">{car.make} | {car.year}</p>
                    <p className="text-lg truncate font-semibold">{car.model}</p>
                </div>
                <div className="ml-auto">
                    <p className="inline-flex justify-center rounded-lg items-center bg-secondary w-7 h-7 font-bold text-center text-sm text-white/50">
                        {car.car_class}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted">
                <p>{drivetrain.toUpperCase()}</p>
                &bull;
                <p>{car.power} BHP</p>
                &bull;
                <p>{car.engine_size}L {car.engine_type}</p>
            </div>
        </button>
    );
}

export default CarBlock;