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
            const cars = await db.cars_fh5.findAll();
    
            if (!cars) {
                return Response.json({
                    error: "There are no cars listed!"
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