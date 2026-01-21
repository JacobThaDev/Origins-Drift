/**
 * The full discord member object
 */
export interface DiscordMemberTypes {
    error?:any;
    avatar: string,
    banner: string,
    communication_disabled_until: string,
    flags: number,
    joined_at: string,
    nick: string,
    pending: false,
    premium_since: string,
    roles: string[],
    unusual_dm_activity_until: string,
    collectibles: any,
    display_name_styles: any,
    user: {
        id: string,
        username: string,
        avatar: string,
        discriminator: number,
        public_flags: number,
        flags: number,
        banner: string,
        accent_color: string,
        global_name: string,
        bot?:boolean,
        avatar_decoration_data: string,
        collectibles: {
            nameplate: {
                sku_id: string,
                asset: string,
                label: string,
                palette: string
            }
        },
        display_name_styles: string,
        banner_color: string,
        clan: string,
        primary_guild: {
            identity_guild_id: string,
            identity_enabled: boolean,
            tag: string,
            badge: string
        }
    },
    mute: boolean,
    deaf: boolean
}