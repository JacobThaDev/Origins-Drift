"use client"

import CarsFH5 from "@/cfg/CarsFH5";
import { CarsTypes } from "@/utils/types/CarsTypes";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { useState } from "react";

interface SelectorTypes {
    userData: UsersTypes;
    favoriteCar: CarsTypes|undefined;
    setFavoriteCar: (arg1: CarsTypes) => void;
}
// eslint-disable-next-line
const CarSelector = ({ userData, favoriteCar, setFavoriteCar }: SelectorTypes) => {

    const [ makeFilter, setMakeFilter ] = useState<string|undefined>();

    const manufacturers:string[] = [];

    CarsFH5.map((car:CarsTypes) => {
        if (!manufacturers.includes(car.make)) {
            manufacturers.push(car.make);
        }
    });

    return(
        <div className="bg-card/70 p-4 rounded-2xl mb-5">
            <p>Favorite Car</p>
            <p className="text-sm mb-5 text-white/60">
                Can be your overall favorite, drift car, or whatever.
            </p>

            {favoriteCar &&
            <div className="bg-infodark/40 p-3 rounded-lg mb-3">
                <p className="text-sm text-white/50">Current</p>
                <p>{favoriteCar?.year} {favoriteCar?.make} {favoriteCar?.model}</p>
            </div>}
            
            <div className="flex flex-col lg:flex-row gap-3">
                <div>
                    <p className="text-sm text-white/70 mb-3">
                        Manufacturer
                    </p>
                    <div className="bg-background border-white/10  border-2 w-full lg:w-[200px] py-2 rounded-lg h-[180px] lg:h-[300px] overflow-y-scroll overflow-x-hidden scrollbar">
                        {manufacturers.map((manufacturer:string, index:number) => {
                            return(
                                <button key={index}
                                    className={`w-full text-start px-2 py-1 truncate max-w-full hover:bg-infodark/30`}
                                    style={{ backgroundColor: makeFilter == manufacturer || favoriteCar?.make == manufacturer ? "#184556" : ""}}
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
                    {CarsFH5.map((car:CarsTypes, index:number) => {
                        if (makeFilter != null) {
                            if (car.make != makeFilter) {
                                return null;
                            }
                        }
                        return(
                            <button key={index}
                                    className={`w-full text-start px-2 py-1 flex gap-3 items-center hover:bg-infodark/30`}
                                    style={{ backgroundColor: favoriteCar == car ? "#184556" : ""}}
                                    onClick={() => setFavoriteCar(car)}>
                                <div className="overflow-hidden">
                                    <p className="truncate"><span className="font-black">{car.year}</span> {car.model}</p>
                                    <p className="truncate text-xs text-white/50">{car.type} / {car.collect}</p>
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