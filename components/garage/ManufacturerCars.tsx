"use client";

import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";
import { GarageContextTypes, useGarageContext } from "@/providers/GarageProvider";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { GarageTypes } from "@/utils/types/GarageTypes";
import LocalApi from "@/services/LocalApi";

type CarBlockTypes = {
    manufacturer:string;
    setDetails: (arg1:CarsDetailsTypes) => void;
}

const ManufacturerCars = ({ manufacturer, setDetails} : CarBlockTypes) => {
    
    const { cars }:CarsContextTypes = useCarsContext();
    const { garage, loadGarage }:GarageContextTypes = useGarageContext();
    const [ adding, setAdding ] = useState<CarsDetailsTypes>();

    const availCars = cars.filter(car => car.make.toLowerCase() == manufacturer.toLowerCase());

    const addCar = async(car:CarsDetailsTypes) => {
        setAdding(car);

        try {
            const result = await LocalApi.post("/garage/add", { 
                car_id: car.id
            });

            if (result.success) {
                await loadGarage();
                setAdding(undefined);
            } else {
                setAdding(undefined);
            }
        } catch (err:any) {
            setAdding(undefined);
            console.log(err);
        }
    }

    return(
        <>
            <div className="w-full mb-10">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-3 mb-5">
                    {availCars && availCars.map((car:CarsDetailsTypes, index:number) => {
                        const inGarage = garage.filter((garage:GarageTypes) => garage.CarData.id == car.id).length > 0;
                            
                        return(
                            <div className="bg-card rounded-xl p-4 group text-start disabled:opacity-70"
                                key={index}>
                                
                                <div className="px-10 relative flex items-center justify-center w-full h-[150px] rounded-lg overflow-hidden mb-4 bg-secondary">
                                    <p className="text-2xl font-black text-white/10 text-center">
                                        {car.make}
                                    </p>
                                </div>

                                <div className="flex mb-3">
                                    <div className="truncate">
                                        <p className="text-muted text-sm">
                                            {car.make} | {car.year}
                                        </p>
                                        <p className="text-lg truncate font-semibold">
                                            {car.model}
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <p className="inline-flex justify-center text-nowrap rounded-lg items-center bg-secondary h-7 w-[70px] font-bold text-center text-sm text-white/50">
                                            {car.car_class}-{car.rating}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 w-full">
                                    <button 
                                        className="inline-block w-full bg-button hover:bg-buttonHover rounded-lg py-2"
                                        onClick={() => setDetails(car)}
                                        disabled={adding != undefined && adding.id == car.id}>
                                        Details
                                    </button>
                                    <button 
                                        className="inline-block text-nowrap px-4 bg-success/70 hover:bg-success rounded-lg py-2 disabled:opacity-50"
                                        onClick={() => addCar(car)}
                                        disabled={inGarage || adding != undefined && adding.id == car.id}>
                                        {inGarage ? "In Garage" : <PlusIcon height={20} className="mx-auto"/>}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
    
}

export default ManufacturerCars;