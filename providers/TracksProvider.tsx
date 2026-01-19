'use client'

import LocalApi from '@/services/LocalApi';
import { LeaderboardTypes } from '@/utils/types/LeaderboardTypes';
import { LeadersTypes } from '@/utils/types/LeadersTypes';
import { TracksTypes } from '@/utils/types/TracksTypes';

import { 
    createContext, useContext, useEffect, useState 
} from 'react';

const TracksContext = createContext<any>(undefined);

interface TracksContextProps {
    children: any;
}

export function TracksContextProvider({ children }:TracksContextProps) {

    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);

    const [ tracks, setTracks ]           = useState<TracksTypes[]>();
    const [ current, setCurrent ]         = useState<TracksTypes>();
    const [ perfIndex, setPerfIndex ]     = useState<"a"|"s1">("a");
    const [ leaderboard, setLeaderboard ] = useState<LeadersTypes[]>();
    const [ error, setError ]             = useState<string>();

    
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        loadTracks();
    }, [ mounted ]);

    const loadTracks = async() => {
        setLoading(true);

        let results = await LocalApi.get("/tracks/");
        
        if (!results || results.error) {
            results.error && setError(results.error);
            setLoading(false);
            return;
        }

        setTracks(results);
        setLoading(false);
    }

    useEffect(() => {
        if (!current) {
            return;
        }

        loadLeaderboard();
    }, [ current, perfIndex ]);

    const loadLeaderboard = async() => {
        setLoading(true);

        let results:LeaderboardTypes = await LocalApi.get(`/tracks/${current?.short_name}/${perfIndex}/leaderboard`);
        
        if (results.error) {
            setError(results.error);
            setLoading(false);
            return;
        }
        
        setLeaderboard(results.leaderboard);
        setLoading(false);
    }

    return (
        <TracksContext.Provider value={{ loading, setLoading, current, setCurrent, tracks, error, setError, perfIndex, setPerfIndex, leaderboard, setLeaderboard }}>
            {children}
        </TracksContext.Provider>
    );

}

export interface TracksContextTypes {
    loading: boolean;
    setLoading: (arg1: boolean) => void;
    tracks: TracksTypes[];
    current: TracksTypes;
    setCurrent: (arg1: TracksTypes|undefined|null) => void;
    error: string;
    setError: (arg1: string|undefined) => void;
    perfIndex: "a"|"s1";
    setPerfIndex: (arg1: "a"|"s1") => void;
    leaderboard: LeadersTypes[];
    setLeaderboard: (arg1: LeadersTypes[]|undefined) => void;
}

export const useTracksContext = () => useContext(TracksContext);