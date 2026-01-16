import { UsersTypes } from "./UsersTypes";

export interface AccountTypes {
    accountId: string;
    userId: string;
    providerId: string;
    User?: UsersTypes;
}