"use client"

import { LeaderboardContextProvider } from '@/providers/LeaderboardProvider';
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

    if (pathname == "/login" 
        || pathname == "/members" 
        || pathname.startsWith("/profile")) {
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
            <ProfileContextProvider>
                <TracksContextProvider>
                    <LeaderboardContextProvider>
                        {children}
                    </LeaderboardContextProvider>
                </TracksContextProvider>
            </ProfileContextProvider>
        </ProgressProvider>
    )
}