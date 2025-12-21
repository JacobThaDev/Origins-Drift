import CarsFH5 from '@/cfg/CarsFH5';
import { CarsTypes } from '@/utils/types/CarsTypes';

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    const bodyData = await res.params;
    const year     = bodyData?.year.toLowerCase().replace("_", " ");

    const carList:CarsTypes[] = CarsFH5;

    const newList = carList.filter(car => car.year == year).map((car:CarsTypes) => {
        return car;
    })
    
    return Response.json(newList);
}