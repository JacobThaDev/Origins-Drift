import { UsersTypes } from "@/utils/types/UsersTypes";
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
    <div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline mb-5">

            <div className="flex items-center gap-5">
                <div>
                    <p className="text-sm text-muted">Garage</p>
                    <p className="text-3xl font-bold">My <span className="italic text-info">Drift</span> Garage</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>)

}

export default DriftGarage;