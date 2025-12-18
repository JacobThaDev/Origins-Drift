'use client'

import { createContext, useContext, useEffect, useState } from 'react';

const LeaderboardContext = createContext<any>(undefined);

interface LeaderboardContextProps {
    children: any;
}

export function LeaderboardContextProvider({ children }:LeaderboardContextProps) {

    const [ classFilter, setClassFilter ] = useState<"a"|"s1">("a");
    const [ loading, setLoading ] = useState<boolean>(false);

    return (
        <LeaderboardContext.Provider value={{ classFilter, setClassFilter, loading, setLoading }}>
            {children}
        </LeaderboardContext.Provider>
    );

}

export interface LeaderboardContextTypes {
    classFilter: string;
    setClassFilter: (arg1: string) => void;
    loading: boolean;
    setLoading: (arg1: boolean) => void;
}

export const useLeaderboardContext = () => useContext(LeaderboardContext);