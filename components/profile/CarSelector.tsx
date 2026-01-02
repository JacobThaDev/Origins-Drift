"use client"

import { formatNumber } from "@/utils/Functions";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import { useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";

// eslint-disable-next-line
const CarSelector = () => {

    const [ makeFilter, setMakeFilter ]    = useState<string|undefined>();
    const { cars, makes }:CarsContextTypes = useCarsContext();
    const { profile, selectedCar, setSelectedCar }:ProfileContextTypes = useProfileContext();

    const convertPowertrain = (car:CarsDetailsTypes) => {
        if (car.powertrain_type == "ICE") {
            return (<>{formatNumber(car.engine_size, 1)}L {car.engine_type}</>);
        }
        if (car.powertrain_type == "Hybrid ICE") {
            return (<>Hybrid {formatNumber(car.engine_size, 1)}L {car.engine_type}</>);
        }
        if (car.powertrain_type == "Hybrid FC") {
            return (<>Hydrogen</>);
        }
        return (<>{car.powertrain_type}</>);
    }

    return(
        <div className="bg-card p-4 rounded-2xl mb-5">
            <p>Favorite Car</p>
            <p className="text-sm mb-5 text-white/60">
                Can be your overall favorite, drift car, or whatever.
            </p>

            <input type="hidden" name="fav_car_fh5" value={profile.AccountData?.fav_car_fh5 ?? "-1"}></input>
            
            <div className="flex flex-col items-center mb-3 relative">
                {profile.AccountData?.fav_car &&
                <div className="bg-infodark/40 p-4 pb-6 rounded-lg w-full">
                    <p className="text-xs text-white/50">Current</p>
                    <p>{profile.AccountData?.fav_car?.year} {profile.AccountData?.fav_car?.make} {profile.AccountData?.fav_car?.model}</p>
                </div>}

                {selectedCar &&
                <>
                <div className="relative w-full h-1.5">
                    <button type="button" onClick={() => setSelectedCar(undefined)} 
                        className="absolute w-12 h-12 rounded-full bg-button hover:bg-buttonHover -top-5 left-4 flex justify-center items-center border-[5px] border-card">
                        <ArrowUturnLeftIcon width={16}/>
                    </button>
                </div>
                

                <div className="bg-success/40 p-4 pt-6 rounded-lg w-full">
                    <p className="text-xs text-white/50">Selected</p>
                    <p>{selectedCar.year} {selectedCar.make} {selectedCar.model}</p>
                </div>
                </>}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-3">
                <div>
                    <p className="text-sm text-white/70 mb-3">
                        Manufacturer
                    </p>
                    <div className="bg-background border-white/10  border-2 w-full lg:w-[200px] py-2 rounded-lg h-[180px] lg:h-[300px] overflow-y-scroll overflow-x-hidden scrollbar">
                        {makes && makes.map((manufacturer:string, index:number) => {
                            return(
                                <button type="button"  key={index}
                                    className={`w-full text-start px-2 py-1 truncate max-w-full hover:bg-infodark/30`}
                                    style={{ backgroundColor: makeFilter == manufacturer || 
                                        selectedCar && selectedCar.make == manufacturer ||
                                        profile.AccountData?.fav_car?.make == manufacturer ? "#184556" : ""}}
                                    onClick={() => setMakeFilter(makeFilter == manufacturer ? undefined : manufacturer)}>
                                    {manufacturer}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="w-full">
                    <p className="text-sm text-white/70 mb-3">
                        Models
                    </p>

                    <div className="bg-background w-full max-w-full border-white/10 border-2 py-2 rounded-lg h-[300px] overflow-y-scroll overflow-x-hidden scrollbar">
                    {cars && cars.map((car:CarsDetailsTypes, index:number) => {
                        if (makeFilter != null) {
                            if (car.make != makeFilter) {
                                return null;
                            }
                        }
                        return(
                            <button type="button" key={index}
                                    className={`w-full text-start px-5 py-2 flex gap-3 items-center group hover:bg-infodark/40`}
                                    style={{ backgroundColor: (car.id == selectedCar?.id || car.id == profile.AccountData?.fav_car?.id ? "#184556AA" : "")}}
                                    onClick={() => setSelectedCar(car.id == selectedCar?.id ? undefined : car)}>
                                <div className="overflow-hidden">
                                    <p className="block text-xs text-white/70">
                                        {car.year} {car.make}
                                    </p>
                                    <p className="truncate">
                                        {car.model}
                                    </p>
                                    <p className="lg:hidden text-xs text-white/70">
                                        {car.powertrain_type != "ICE" 
                                            ? convertPowertrain(car) 
                                            : <>{formatNumber(car.engine_size, 1)}L {car.engine_type}</>}
                                    </p>
                                </div>
                                <div className="flex gap-1 text-xs text-white/70 ml-auto">
                                    <div className="bg-card group-hover:bg-infodark p-0.5 px-2 rounded text-nowrap hidden lg:inline-block">
                                        {car.powertrain_type != "ICE" 
                                            ? convertPowertrain(car) 
                                            : <>{formatNumber(car.engine_size, 1)}L {car.engine_type}</>}
                                    </div>
                                    {car.aspiration && <div className="bg-card group-hover:bg-infodark p-0.5 px-2 rounded hidden lg:inline-block">
                                        {car.aspiration == "Naturally-Aspirated" ? "N/A" : 
                                            car.aspiration == "Turbocharged" ? "Turbo" :
                                            car.aspiration == "Twin-Turbocharged" ? "Twin-Turbo" :
                                            car.aspiration == "Supercharged" ? "Supercharged":
                                            car.aspiration == "Twin-Charged" ? "Twin Charged": 
                                            car.aspiration == "Twin-Supercharged" ? "Twin SC" :
                                            car.aspiration == "Twin-Screw Supercharged" ? "Twin Screw SC" : "" }
                                    </div>}
                                    <div className="bg-card group-hover:bg-infodark p-0.5 px-2 rounded hidden lg:inline-block">
                                        {car.drivetrain == "Front-Wheel Drive" ? "FWD" : 
                                        car.drivetrain == "Rear-Wheel Drive" ? "RWD" : "AWD"}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CarSelector;