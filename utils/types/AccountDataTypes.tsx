import { CarsDetailsTypes } from "./CarsDetailsTypes";
import { GamingPlatform } from "./PlatformsTypes";

export interface AccountDataTypes {
    user_id: string;
    display_name: string|null;
    platform: GamingPlatform|null;
    platform_name: string|null;
    fav_car_fh5: number|null;
    fav_car?: CarsDetailsTypes;
    about_me: string|null;
    update: (...args:any[]) => any
}