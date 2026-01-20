import { TracksTypes } from "./TracksTypes";
import { UsersTypes } from "./UsersTypes";

export interface LeadersTypes {
    class: string;
    score: number;
    verified: boolean;
    proof_url: string;
    proof_delete_hash: string;
    User?: UsersTypes;
    createdAt: string;
    updatedAt: string;
    Track?: TracksTypes;
}