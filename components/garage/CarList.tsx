"use client";

import { useEffect, useState } from "react";
import Container from "../layout/Container";
import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";
import ManufacturerCars from "./ManufacturerCars";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import CarDetailsSidebar from "./CarDetailsSidebar";
import MakeSelector from "./MakeSelector";

const CarList = () => {

    const { makes }:CarsContextTypes    = useCarsContext();

    const [ mounted, setMounted ]       = useState<boolean>(false);
    const [ activeIdx, setActiveIdx ]   = useState<number>(0);
    const [ active, setActive ]         = useState<string>();

    const [ details, setDetails ]       = useState<CarsDetailsTypes>();
    const [ detailType, setDetailType ] = useState<"basic"|"advanced">("basic");
    
    useEffect(() => setMounted(true), []);
    
    useEffect(() => {
        if (!mounted || !makes || makes.length == 0) {
            return;
        }

        if (!active)
            setActive(makes[activeIdx]);

        setActive(makes[activeIdx]);

    }, [mounted, makes, activeIdx]);

    const filtered = makes ?  makes.filter((make:string) => make.toLowerCase() == active?.toLowerCase()) : [];

    return(
        <>
            <div className="pb-24">
                <Container>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start mb-10 gap-5">
                        <div>
                            <p className="font-bold text-3xl">
                                Add Cars to Garage
                            </p>
                            <p>Find your cars from the list below and click add them to your garage.</p>
                        </div>
                    </div>

                    <MakeSelector 
                        makes={makes} 
                        activeIdx={activeIdx} 
                        setActiveIdx={setActiveIdx}/>

                    <div className="flex items-stretch gap-10">
                        {details && 
                            <CarDetailsSidebar
                                details={details}
                                setDetails={setDetails}
                                setDetailType={setDetailType}
                                detailType={detailType} />}

                        <div className="w-full">
                            {filtered.map((manufacturer:string, index:number) => {
                                return(
                                    <ManufacturerCars 
                                        key={"car-"+index}
                                        manufacturer={manufacturer}
                                        setDetails={setDetails}/>
                                )
                            })}
                        </div>
                    </div>
                </Container>

            </div>
        </>
    );
}

export default CarList;