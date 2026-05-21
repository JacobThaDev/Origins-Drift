import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import { useState } from "react";
import CarDetails from "./CarDetails";

interface CarBlockTypes {
    manufacturer: string;
}

const CarBlock = ({ manufacturer }: CarBlockTypes) => {

    const { cars }:CarsContextTypes = useCarsContext();
    const [ details, setDetails ] = useState<CarsDetailsTypes>();

    if (!manufacturer) {
        return null;
    }

    const available = cars.filter(car => car.make.toLowerCase() == manufacturer.toLowerCase());

    const openModal = (details:CarsDetailsTypes) => {
        document.body.classList.add('overflow-y-hidden');
        setDetails(details);
    }

    return(
        <>
        <CarDetails details={details} setDetails={setDetails} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-3">
            
            {available && available.map((car:CarsDetailsTypes, index:number) => {
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
                                onClick={() => openModal(car)}>
                                Details
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default CarBlock;