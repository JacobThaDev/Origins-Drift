import { UsersTypes } from "./UsersTypes";

export interface LeadersTypes {
    username: string;
    class: string;
    score: number;
    verified: boolean;
    proof_url: string;
    User?: UsersTypes;
    createdAt: string;
    updatedAt: string;
}