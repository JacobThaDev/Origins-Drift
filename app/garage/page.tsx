"use client";

import CarGarage from "@/components/garage/CarGarage";
import CarList from "@/components/garage/CarList";
import GarageHeader from "@/components/garage/GarageHeader";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import Unauthorized from "../../components/unauthorized";

export default function MyGarage() {

    const { profile, session }:ProfileContextTypes = useProfileContext();
    
    if (!profile || !session) {
        return (<Unauthorized/>)
    }

    return (
        <>
            <GarageHeader/>
            <CarGarage/>
            <CarList/>
        </>
    )
}