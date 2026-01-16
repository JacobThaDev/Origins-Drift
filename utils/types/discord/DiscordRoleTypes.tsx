/**
 * The full Discord Role types received from the discord api
 */
export interface DiscordRoleTypes {
    id: string,
    name: string,
    description: string|null,
    permissions: string,
    position: number,
    color: number,
    colors: {
        primary_color: number,
        secondary_color: number,
        tertiary_color: number
    },
    hoist: boolean,
    managed: boolean,
    mentionable: boolean,
    icon: string,
    unicode_emoji: string,
    flags: number
}