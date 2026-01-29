export interface RecordsClassTypes {
    a: RecordsTypes[],
    s1: RecordsTypes[];
};

export interface RecordsTypes {
    id: number;
    name: string;
    short_name: string;
    length: number;
    game: number;
    favorite: boolean;
    track_image: string;
    top_score: number;
    rank: number;
};