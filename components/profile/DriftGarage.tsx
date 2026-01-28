import { UsersTypes } from "@/utils/types/UsersTypes";
import Container from "../layout/Container";
import { GarageTypes } from "@/utils/types/GarageTypes";
import Image from "next/image";

interface DriftGarageTypes {
    member: UsersTypes|undefined;
    garage: GarageTypes[]|undefined;
}

const DriftGarage = ({ member, garage }: DriftGarageTypes) => {

    if (!member) {
        return null;
    }

    return(
    <>
        <div className="py-10 pb-20">
            <Container>
                <div className="flex flex-col justify-center gap-4 mb-5">
                    <div>
                        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                            Garage
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                            My <span className="italic text-info">Drift</span> Garage
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {garage && garage.map((car:GarageTypes, index:number) => {

                        const drivetrain_type = car.CarData.drivetrain.toLowerCase();

                        const drivetrain = drivetrain_type == 'rear-wheel drive' ? 'rwd' :
                            drivetrain_type == 'front-wheel drive' ? 'fwd' : 'awd';

                        return(
                            <div className="bg-card rounded-xl group text-start" 
                                key={"garage-"+index}>

                                <div className="relative overflow-hidden w-full h-[150px] bg-secondary rounded-xl inline-flex items-center justify-center">
                                    {car.image_url ?
                                    <div className="flex items-center justify-center absolute w-full h-full overflow-hidden">
                                        <Image 
                                            unoptimized
                                            src={car.image_url} 
                                            width={1920} height={1080} 
                                            className="w-full min-w-[350px] opacity-80"
                                            alt="" 
                                            referrerPolicy="no-referrer"/>
                                    </div> : 
                                    <p className="text-3xl font-black text-white/10 text-center">
                                        {car.CarData.make}
                                    </p>}

                                    <div className="absolute flex gap-1 items-center text-sm justify-end bottom-4 w-full px-4">
                                        <p className="inline-block text-muted p-1 bg-card/60 px-3 rounded-md backdrop-blur font-bold">
                                            {car.CarData.car_class}
                                        </p>

                                        <p className="inline-block text-muted p-1 bg-card/60 px-3 rounded-md backdrop-blur font-bold">
                                            {drivetrain.toUpperCase()}
                                        </p>
                                        
                                    </div>
                                </div>
                                
                                <div className="p-4 py-2">
                                    <div className="flex mb-3">
                                        <div className="truncate w-full">
                                             <div className="flex items-center">
                                                <p className="text-muted text-sm">
                                                    {car.CarData.make} | {car.CarData.year}
                                                </p>
                                                <div className="ml-auto">
                                                    <p className="font-bold text-info">
                                                        {car.CarData.power} HP
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-lg truncate font-semibold">
                                                {car.CarData.model}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>
    </>)

}

export default DriftGarage;