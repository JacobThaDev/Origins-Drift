import { GamingPlatform } from "./PlatformsTypes";

export interface AccountDataTypes {
    user_id: string;
    platform: GamingPlatform|null;
    platform_name: string|null;
    about_me: string|null;
    update: (...args:any[]) => any
}