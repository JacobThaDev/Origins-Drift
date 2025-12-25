import { GamingPlatform } from "./PlatformsTypes";

export interface AccountDataTypes {
    user_id: string;
    display_name: string;
    platform: GamingPlatform;
    platform_name: string;
    about_me: string;
}