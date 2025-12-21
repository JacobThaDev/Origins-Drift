import CarsFH5 from '@/cfg/CarsFH5';

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    return Response.json(CarsFH5);
}