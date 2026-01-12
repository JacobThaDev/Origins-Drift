import db from '@/models';
import { unstable_cache } from 'next/cache';

/**
 * fetches a car by its id and caches the result
 * @param car_id
 * @returns CarsTypes
 */
const getCachedCar = (car_id:number) => unstable_cache(
    async () => {
        return await db.cars_fh5.findOne({
            where: {
                id: car_id
            }
        });
    },
    ['cars', String(car_id)], {
        tags: [
            'cars',
            `cars-${car_id}`,
        ]
    }
)();

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const bodyData  = await res.params;
        const car_id:number = bodyData?.id as number;

        const cars = await getCachedCar(car_id);

        if (!cars || cars.error) {
            return Response.json({
                error: "Could not find specific car id."
            });
        }

        return Response.json(cars);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            success: false,
            message: e.message
        });
    }
}