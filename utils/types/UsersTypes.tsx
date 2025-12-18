import { AccountDataTypes } from "./AccountTypes";

export interface UsersTypes {
    id: string;
    name: string;
    email:string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    twoFactorEnabled: boolean;
    role: string;
    banned: boolean;
    banReason: string;
    banExpires: string;
    AccountData?: AccountDataTypes;
}