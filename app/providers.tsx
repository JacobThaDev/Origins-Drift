"use client"

import { AppProgressProvider as ProgressProvider } from '@bprogress/next';


/**
 * Out of sight, out of mind. A place for all the scaffolding
 * @param {React.ReactNode} children 
 * @returns 
 */
export default function Providers({ children }: {  children: React.ReactNode }) {
    
    return(
        <ProgressProvider 
          height="4px"
          color="#08B0F0"
          options={{ showSpinner: true }}
          shallowRouting
        >
            {children}
        </ProgressProvider>
    )
}