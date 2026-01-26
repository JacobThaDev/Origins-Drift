"use client";

import { GarageContextTypes, useGarageContext } from "@/providers/GarageProvider";
import Container from "../layout/Container";
import { GarageTypes } from "@/utils/types/GarageTypes";
import CarGarageBlock from "./CarGarageBlock";
import EmptyCarGarageBlock from "./EmptyCarGarageBlock";

const CarGarage = () => {

    const { garage }:GarageContextTypes = useGarageContext();

    return(
        <>
            <div>
                <Container>
                    <p className="font-bold text-3xl mb-5">My Garage</p>

                    {garage.length == 0 && <EmptyCarGarageBlock/>}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {garage.map((car:GarageTypes, index:number) => {
                            return(
                                <CarGarageBlock car={car} key={index}/>
                            )
                        })}
                    </div>
                </Container>

                <hr className="my-10 border-border"></hr>
            </div>
        </>
    );
}

export default CarGarage;