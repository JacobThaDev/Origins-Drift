import { GamesTypes } from "./GamesTypes";

export interface TracksTypes {
    id: number;
    name: string;
    short_name: string;
    game: number;
    Game: GamesTypes;
    length: number;
    favorite: boolean;
    track_image: string;
    error?: string;
}