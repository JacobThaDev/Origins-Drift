import { AccountDataTypes } from "./AccountDataTypes";
import { AccountTypes } from "./AccountTypes";

export interface UsersTypes {
    id: string;
    name: string;
    emai?:string;
    emailVerified?: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    twoFactorEnabled: boolean;
    role: string;
    banned: boolean;
    banReason: string;
    banExpires: string;
    AccountData: AccountDataTypes;
    Account: AccountTypes;
    //update: (...args:any[]) => void
}