"use client";

import { useEffect, useState } from "react";
import Container from "../layout/Container";
import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import CarDetails from "./CarDetails";
import MakeSelector from "../garage/MakeSelector";
import CarBlock from "./CarBlock";

const CarList = () => {

    const { makes }:CarsContextTypes = useCarsContext();

    const [ active, setActive ]         = useState<string>();
    const [ activeIdx, setActiveIdx ]   = useState<number>(0);
    const [ details, setDetails ]       = useState<CarsDetailsTypes>();
    const [ detailType, setDetailType ] = useState<"basic"|"advanced">("basic");
    const [ mounted, setMounted ]       = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted || !makes || makes.length == 0) {
            return;
        }

        if (!active)
            setActive(makes[activeIdx]);

        setActive(makes[activeIdx]);
    }, [mounted, makes, activeIdx]);

    const filtered = makes ? makes.filter((make:string) => make.toLowerCase() == active?.toLowerCase()) : [];

    return(
        <div className="pb-24">
            <Container>
                {details && 
                    <CarDetails
                        details={details}
                        setDetails={setDetails}
                        setDetailType={setDetailType}
                        detailType={detailType} />}

                <MakeSelector 
                    makes={makes} 
                    activeIdx={activeIdx} 
                    setActiveIdx={setActiveIdx} />

                {filtered.map((manufacturer:string, index:number) => {
                    return(
                        <CarBlock 
                            key={"car-"+index}
                            manufacturer={manufacturer}
                            setDetails={setDetails}/>
                    )
                })}
            </Container>
        </div>
    );
}

export default CarList;