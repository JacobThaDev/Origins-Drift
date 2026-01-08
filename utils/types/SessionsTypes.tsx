// {
//   session: {
//     expiresAt: 2026-01-15T06:20:39.000Z,
//     token: 'cy3Pas8Pq69MtRRQviNE5Ts2dlmxy7iA',
//     createdAt: 2026-01-06T08:30:13.000Z,
//     updatedAt: 2026-01-08T06:20:39.000Z,
//     ipAddress: '127.0.0.1',
//     userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',        
//     userId: 'IV2raBTy3BunXi3fBnUw2rft9PiTRgor',
//     id: 'C5U1Ffjk0oI1YDLVBjiWd2Ilh54Gob0R'
//   },
//   user: {
//     name: 'Jacob',
//     email: 'rune.evo2012@gmail.com',
//     emailVerified: true,
//     image: 'https://cdn.discordapp.com/avatars/150486701695827968/edf0bfa538c59d331dc3bde3f24541b6.png',
//     createdAt: 2025-12-19T07:31:53.000Z,
//     updatedAt: 2025-12-19T07:31:53.000Z,
//     id: 'IV2raBTy3BunXi3fBnUw2rft9PiTRgor'
//   }

import { UsersTypes } from "./UsersTypes"

export interface SessionsTypes {
    session: {
        id: string;
        userId: string;
        token: string;
        expiresAt: string | Date;
        createdAt: string | Date;
        updatedAt: string | Date;
        ipAddress?: string | null;
        userAgent?: string | null;
    };
    user: UsersTypes;
}