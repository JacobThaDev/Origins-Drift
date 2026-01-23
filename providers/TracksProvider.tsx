'use client'

import LocalApi from '@/services/LocalApi';
import { GamesSymbol, GamesTypes } from '@/utils/types/GamesTypes';
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
    const [ loading, setLoading ] = useState<boolean>(true);

    // for when after the page is loaded
    const [ fetching, setFetching ] = useState<boolean>(true);

    const [ tracks, setTracks ]           = useState<TracksTypes[]>();
    const [ current, setCurrent ]         = useState<TracksTypes>();
    const [ perfIndex, setPerfIndex ]     = useState<"a"|"s1">("a");
    const [ leaderboard, setLeaderboard ] = useState<LeadersTypes[]>();
    const [ error, setError ]             = useState<string>();
    const [ game, setGame ]               = useState<GamesSymbol>("FH5");

    
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        loadTracks();
    }, [ mounted, perfIndex ]);

    const loadTracks = async() => {
        let results = await LocalApi.get(`/tracks?class=${perfIndex}`);
        
        if (!results || results.error) {
            setError(results.error);
            setLoading(false);
            return;
        }

        setTracks(results);
    }

    useEffect(() => {
        if (!current) {
            return;
        }

        loadLeaderboard(false);
    }, [ current, perfIndex ]);

    const loadLeaderboard = async(showLoader:boolean = false) => {
        if (showLoader)
            setLoading(true);

        setFetching(true);
        
        let results:LeaderboardTypes = await LocalApi.get(
            `/tracks/${current?.short_name}/${perfIndex}/leaderboard`
        );
        
        if (results.error) {
            setError(results.error);
            setLoading(false);
            setFetching(false);
            return;
        }
        
        setLeaderboard(results.leaderboard);
        setLoading(false);
        setFetching(false);
    }

    return (
        <TracksContext.Provider value={{ 
            loading, setLoading, loadLeaderboard, current, setCurrent, tracks, error, 
            setError, perfIndex, setPerfIndex, leaderboard, setLeaderboard, game, setGame,
            fetching
            }}>
            {children}
        </TracksContext.Provider>
    );

}

export interface TracksContextTypes {
    loading: boolean;
    fetching: boolean;
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
    loadLeaderboard: (arg1?:boolean) => void;
    game: GamesSymbol;
    setGame: (arg1: GamesSymbol) => void;
}

export const useTracksContext = () => useContext(TracksContext);