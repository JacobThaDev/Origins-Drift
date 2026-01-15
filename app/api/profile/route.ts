import db from '@/models';
import LocalApi from '@/services/LocalApi';
import { CarsDetailsTypes } from '@/utils/types/CarsDetailsTypes';
import { UsersTypes } from '@/utils/types/UsersTypes';
import { revalidateTag } from 'next/cache';
import { getCachedUser } from '../data';

/**
 * Get a user from a session cookie - must be logged in.
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        if (req.headers.get("cookie") == "" || req.headers.get("cookie") == undefined) {
            return Response.json({ error: "Please log in to use this endpoint."});
        }

        const { data: session } = await LocalApi.get("/auth/get-session", {
            headers: {
                 // Forward the cookie header from the request. without it, the user isn't logged in.
                cookie: req.headers.get("cookie") || "",
            },
        });

        if (!session) {
            return Response.json({ 
                error: "Please log in to use this endpoint."
            });
        }
        
        const user_id = session.user.id;
        const user = await getCachedUser(user_id);

        return Response.json(user);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}

/**
 * POST Endpoint to update profile information.
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function POST(req: any, res:any) {
    try {
        if (req.headers.get("cookie") == "" || req.headers.get("cookie") == undefined) {
            return Response.json({ error: "Please log in to use this endpoint."});
        }

        const { data: session } = await LocalApi.get("/auth/get-session", {
            headers: {
                cookie: req.headers.get("cookie") || "",
            },
        });

        if (!session) {
            return Response.json({ 
                error: "Please log in to use this endpoint."
            });
        }

        const user_id = session.user.id;
        const user:UsersTypes = await getCachedUser(user_id);

        if (!user || user.error) {
             return Response.json({ 
                error: "Could not find profile"
            });
        }

        const body = await req.json();

        const { 
            about_me, display_name, favorite_car, platform, platform_name
        }:RequestTypes = body;

        let car:CarsDetailsTypes|undefined;
            
        if (favorite_car != -1 && favorite_car != undefined) {
            car = await db.cars_fh5.findOne({
                where:{
                    id: favorite_car
                }
            });

            if (!car) {
                return Response.json({ 
                    error: "Invalid car id."
                });
            }
        }

        if (!user.AccountData) {
            const created = await db.accountData.create({
                user_id: user.id,
                display_name: display_name,
                platform: platform,
                platform_name: platform_name,
                fav_car_fh5: car ? car.id : null,
                about_me: about_me
            });

            if (!created) {
                return Response.json({
                    error: "Failed to create entry."
                });
            }

            revalidateTag(`users-${user.id}`);
        } else {
            // Use the model directly rather than the cached 'user' instance
            const updated = await db.accountData.update({
                display_name: display_name,
                platform: platform === "" || platform === undefined ? null : platform,
                platform_name: (platform === "" || platform === undefined || platform_name === "") ? null : platform_name,
                fav_car_fh5: car ? car.id : user.AccountData.fav_car_fh5,
                about_me: about_me
            }, {
                where: { user_id: user.id } // Target the record by the user's ID
            });

            if (!updated) {
                return Response.json({
                    error: "Failed to update profile."
                });
            }

            revalidateTag(`users-${user.id}`);
        }

        const freshUser:UsersTypes = await getCachedUser(user.id);
        
        return Response.json({
            success: true,
            message: "Profile updated!",
            account: freshUser,
        });
    } catch (e:any) {
        console.error(e);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    about_me: string;
    display_name: string;
    favorite_car: number;
    platform: string;
    platform_name: string;
}