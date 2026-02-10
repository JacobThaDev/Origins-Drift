"use client"

import { ProfileContextProvider } from '@/providers/ProfileProvider';
import { TracksContextProvider } from '@/providers/TracksProvider';
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

import { usePathname } from 'next/navigation';

/**
 * Out of sight, out of mind. A place for all the scaffolding
 * @param {React.ReactNode} children 
 * @returns 
 */
export default function Providers({ children }: {  children: React.ReactNode }) {
    
    const pathname = usePathname();

    if (pathname == "/profile" || pathname.startsWith("/profile") 
        || pathname == "/garage" || pathname == "/cars" || pathname == "/members") {
        return(
        <ProgressProvider 
            height="4px"
            color="#08B0F0"
            options={{ showSpinner: true }}
            shallowRouting>
            <ProfileContextProvider>
                {children}
            </ProfileContextProvider>
        </ProgressProvider>
    )
    }

    return(
        <ProgressProvider 
            height="4px"
            color="#08B0F0"
            options={{ showSpinner: true }}
            shallowRouting>
            <TracksContextProvider>
                <ProfileContextProvider>
                    {children}
                </ProfileContextProvider>
            </TracksContextProvider>
        </ProgressProvider>
    )
}