"use client"

import { client } from '@/lib/auth-client';
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
    
    const { data:session } = client.useSession();
    const pathname = usePathname();

    const isLoginPath = pathname === "/login";

    if (isLoginPath || (pathname === "/profile" && !session) || pathname == "/members") {
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