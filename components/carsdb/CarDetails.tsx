"use client";

import { formatNumber } from "@/utils/Functions";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";

type CarBlockTypes = {
    car: CarsDetailsTypes, 
    search: string|undefined,
    makeFilter: string|undefined
}

const CarDetails = ({ car, search, makeFilter } : CarBlockTypes) => {
    
    if (search) {
        const full_car_name = car.year+" "+car.make+" "+car.model;
        const full_car_partial_name = car.year+" "+car.model;

        if ((makeFilter && makeFilter != car.make) || 
                (!full_car_name.toLowerCase().includes(search.toLowerCase()) 
                    && !full_car_partial_name.toLowerCase().includes(search.toLowerCase())))
            return null;
    } else {
        if (makeFilter != null && car.make != makeFilter)
            return null;
    }

    const drivetrain_type = car.drivetrain.toLowerCase();

    //const drivetrain = drivetrain_type == 'rear-wheel drive' ? 'rwd' :
     //   drivetrain_type == 'front-wheel drive' ? 'fwd' : 'awd';

    return(
        <tr>
            <td className="max-w-[200px]">
                <p className="text-sm text-muted truncate">{car.year} {car.make}</p>
                <p className="text-nowrap truncate">{car.model}</p>
            </td>
            <td>
                <p>{car.engine_placement}</p>
                <p className="text-sm text-muted">{drivetrain_type}</p>
            </td>
            <td className="text-sm">
                <p>{car.engine_size}L {car.engine_type}</p>
                <p className="text-muted">{formatNumber(car.power)} HP | {formatNumber(car.torque)} lb-ft</p>
            </td>
        </tr>
    )
}

export default CarDetails;