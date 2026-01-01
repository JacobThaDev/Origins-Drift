import CarsFH5 from '@/cfg/CarsFH5';
import db from '@/models';

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const bodyData  = await res.params;
        const id:number = bodyData?.id as number;

        const cars = await db.cars_fh5.findOne({
            where: {
                id: id
            }
        });

        if (!cars) {
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