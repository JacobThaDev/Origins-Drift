import CarGarage from "@/components/garage/CarGarage";
import CarList from "@/components/garage/CarList";
import GarageHeader from "@/components/garage/GarageHeader";

export default function MyGarage() {

    return (
        <>
            <GarageHeader/>
            <CarGarage/>
            <CarList/>
        </>
    )
}