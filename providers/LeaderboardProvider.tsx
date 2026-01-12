'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { TracksContextTypes, useTracksContext } from './TracksProvider';
import { ScoresTypes } from '@/utils/types/ScoresTypes';
import LocalApi from '@/services/LocalApi';
import { LeadersTypes } from '@/utils/types/LeadersTypes';

const LeaderboardContext = createContext<any>(undefined);

interface LeaderboardContextProps {
    children: any;
}

export function LeaderboardContextProvider({ children }:LeaderboardContextProps) {

    const [ game, setGame ] = useState<"fh4"|"fh5"|"fh6">("fh5");
    const [ classFilter, setClassFilter ] = useState<"a"|"s1">("a");
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ scores, setScores ]   = useState<LeadersTypes[]>();
    const { activeTrack }:TracksContextTypes = useTracksContext();

    useEffect(() => {
        if (!activeTrack) {
            return;
        }
        loadScores();
        return() => setScores(undefined);
    }, [activeTrack, classFilter])

    async function loadScores() { 
        setLoading(true);
        const trackData:ScoresTypes = await LocalApi.get("games/"+game+"/"+activeTrack.short_name+"/leaders/"+classFilter).then(r => r.data);;
        setScores(trackData.scores);
        setLoading(false);
    }

    return (
        <LeaderboardContext.Provider value={{ game, setGame, classFilter, setClassFilter, loading, setLoading, scores, setScores, loadScores }}>
            {children}
        </LeaderboardContext.Provider>
    );

}

export interface LeaderboardContextTypes {
    game: string;
    setGame: (arg1: string) => void;
    loadScores: () => void;
    classFilter: string;
    setClassFilter: (arg1: string) => void;
    loading: boolean;
    setLoading: (arg1: boolean) => void;
    scores: LeadersTypes[];
    setScores: (arg1: LeadersTypes[]) => void;
}

export const useLeaderboardContext = () => useContext(LeaderboardContext);