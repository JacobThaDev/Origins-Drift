import db from '@/models';
import { unstable_cache } from 'next/cache';

/**
 * gets a full list of cars and caches it
 */
const getCars = unstable_cache(
  async () => {
    return await db.cars_fh5.findAll();
  },
  ['cars-list'], // Unique key for this cache entry
  { 
    tags: ['cars'] // This is the label we will "kill" later
  }
);

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const cars = await getCars();

        if (!cars) {
            return Response.json({
                error: "There are no cars listed!"
            });
        }

        return Response.json(cars, {
            status: 200
        });
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            success: false,
            message: e.message
        });
    }
}