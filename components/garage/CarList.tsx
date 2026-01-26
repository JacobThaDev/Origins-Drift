"use client";

import { useState } from "react";
import Container from "../layout/Container";
import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import { CheckIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LocalApi from "@/services/LocalApi";
import { GarageContextTypes, useGarageContext } from "@/providers/GarageProvider";
import { GarageTypes } from "@/utils/types/GarageTypes";

const CarList = () => {

    const { cars, makes }:CarsContextTypes = useCarsContext();
    const { garage, setGarage }:GarageContextTypes = useGarageContext();

    const [ make, setMake ] = useState<string>();
    const [ search, setSearch ] = useState<string>();
    const [ status, setStatus ] = useState<string>();

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

    return(
        <>
            <div className="pb-24">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-start mb-10">
                        <div>
                            <p className="font-bold text-3xl mb-5">
                                Browse Cars
                            </p>
                        </div>
                        <div>

                        </div>
                    </div>
                    

                    <div className="flex items-start gap-6">

                        <div className="min-w-[250px] max-w-[250px] pe-3">
                            <p className="font-bold text-xl text-white mb-5">
                                Manufacturer
                            </p>
                            <div className="h-full max-h-[600px] overflow-y-auto scrollbar">
                                {makes && makes.map((carmake:string, index:number) => {
                                    return(
                                        <button key={index} 
                                            onClick={() => make == carmake ? setMake(undefined) : setMake(carmake)} 
                                            className={`inline-block w-full text-start px-3 py-2 hover:bg-card ${carmake == make && "bg-card font-bold"}`}>
                                            {carmake}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="w-full">

                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5">
                                <div>
                                    <p className="font-bold text-xl">
                                        {make ? make : search ? "Search results" : "Select a Manufacturer"}
                                    </p>
                                </div>
                                <div className="w-full max-w-[600px] relative">
                                    <MagnifyingGlassIcon height={20}
                                        className="absolute top-3 left-3"/>
                                    <input type="text"
                                        id="search-input"
                                        onChange={(e:any) => setSearch(e.target.value)}
                                        className="ps-10 bg-secondary border-card rounded-lg px-5 py-3 w-full"
                                        placeholder={`${make ? `Search '${make}'` : 'Search make or model'}`}/>
                                    
                                    {search && 
                                        <button 
                                            onClick={() => {
                                                setSearch(undefined);
                                                const field:any = document.getElementById("search-input");
                                                if (field)
                                                    field.value = '';
                                            }} 
                                            className="absolute top-3 right-3">
                                            <XMarkIcon height={20}
                                                strokeWidth={2} />
                                        </button>}
                                </div>
                            </div>
                            

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cars && cars.map((car:CarsDetailsTypes, index:number) => {
                                    
                                    if (search) {
                                        if ((make && make != car.make) || !car.model.toLowerCase().includes(search.toLowerCase()))
                                            return;
                                    } else {
                                        if (make == null || car.make != make)
                                            return;
                                    }

                                    const drivetrain_type = car.drivetrain.toLowerCase();

                                    const drivetrain = drivetrain_type == 'rear-wheel drive' ? 'rwd' :
                                        drivetrain_type == 'front-wheel drive' ? 'fwd' : 'awd';

                                    const inGarage = garage.filter((garage:GarageTypes) => garage.CarData.id == car.id).length > 0;
 
                                    return(
                                        <div className="bg-card rounded-xl p-4" key={"car-"+index}>

                                            <div className="px-10 relative flex items-center justify-center w-full h-[150px] rounded-lg overflow-hidden mb-4 bg-secondary">
                                                <p className="text-3xl font-black text-white/10 text-center">
                                                    {car.make}
                                                </p>

                                                {!inGarage && <button onClick={() => addCar(car)}
                                                    disabled={status != null}
                                                        className="inline-flex items-center gap-2 absolute top-2 right-2 ml-auto px-3 py-2 text-sm rounded-md bg-success text-white">
                                                    <PlusIcon height={18} strokeWidth={2}/>
                                                    <p className="text-white">
                                                        {"Add"}
                                                    </p>
                                                </button>}

                                                {inGarage && <button disabled
                                                        className="disabled:opacity-50 inline-flex items-center gap-2 absolute top-2 right-2 ml-auto px-3 py-2 text-sm rounded-md bg-success text-white">
                                                    <CheckIcon height={18} strokeWidth={2}/>
                                                    <p className="text-white">Added</p>
                                                </button>}
                                            </div>

                                            <div className="flex mb-3">
                                                <div>
                                                    <p className="text-muted">{car.make}</p>
                                                    <p className="text-lg font-semibold">{car.year} {car.model}</p>
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
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    
                </Container>

            </div>
        </>
    );
}

export default CarList;