'use client'

import LocalApi from '@/services/LocalApi';
import { GamesSymbol, GamesTypes } from '@/utils/types/GamesTypes';
import { LeaderboardTypes } from '@/utils/types/LeaderboardTypes';
import { ScoresTypes } from '@/utils/types/ScoresTypes';
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
    const [ leaderboard, setLeaderboard ] = useState<ScoresTypes[]>();
    const [ error, setError ]             = useState<string>();
    const [ game, setGame ]               = useState<GamesSymbol>("FH5");

    
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }
        console.log("called")
        loadTracks();
    }, [ mounted, perfIndex ]);

    useEffect(() => {
        async function loadLeaderboard() {
            let results:LeaderboardTypes = await LocalApi.get(
                `/tracks/${current?.short_name}/${perfIndex}/leaderboard`
            );
            
            if (results.error) {
                setError(results.error);
                setLoading(false);
                setFetching(false);
                return false;
            }

            setLeaderboard(results.leaderboard);
            setLoading(false);
            setFetching(false);
        }

        if (tracks && current)
            loadLeaderboard();
    }, [ tracks, current ]);

    const loadTracks = async(loadFlag:boolean = false) => {
        if (loadFlag)
            setLoading(true);

        try {
            let results = await LocalApi.get(`/tracks?class=${perfIndex}`);
            
            if (!results || results.error) {
                setError(results.error);
                setLoading(false);
                return false;
            }

            setTracks(results);
            return true;
        } catch (err:any) {
            setLoading(false);
            setError(err.message);
            return false;
        }
    }

    const loadLeaderboard = async(showLoader:boolean = false) => {
        if (showLoader)
            setLoading(true);

        setFetching(true);
        
        try {
            let results:LeaderboardTypes = await LocalApi.get(
                `/tracks/${current?.short_name}/${perfIndex}/leaderboard`
            );
            
            if (results.error) {
                setError(results.error);
                setLoading(false);
                setFetching(false);
                return false;
            }
            
            setLeaderboard(results.leaderboard);
            setLoading(false);
            setFetching(false);
            return true;
        } catch (err:any) {
            setLoading(false);
            setFetching(false);
            setError(err.message);
            return false;
        }
    }

    return (
        <TracksContext.Provider value={{ 
            loading, setLoading, loadLeaderboard, current, setCurrent, tracks, error, 
            setError, perfIndex, setPerfIndex, leaderboard, setLeaderboard, game, setGame,
            fetching, setFetching, loadTracks
            }}>
            {children}
        </TracksContext.Provider>
    );

}

export interface TracksContextTypes {
    loading: boolean;
    fetching: boolean;
    setLoading: (arg1: boolean) => void;
    setFetching: (arg1: boolean) => void;
    tracks: TracksTypes[];
    loadTracks: (arg1?:boolean) => Promise<boolean>;
    current: TracksTypes;
    setCurrent: (arg1: TracksTypes|undefined|null) => void;
    error: string;
    setError: (arg1: string|undefined) => void;
    perfIndex: "a"|"s1";
    setPerfIndex: (arg1: "a"|"s1") => void;
    leaderboard: ScoresTypes[];
    setLeaderboard: (arg1: ScoresTypes[]|undefined) => void;
    loadLeaderboard: (arg1?:boolean) => Promise<boolean>;
    game: GamesSymbol;
    setGame: (arg1: GamesSymbol) => void;
}

export const useTracksContext = () => useContext(TracksContext);