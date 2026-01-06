'use client'

import LocalApi from '@/services/LocalApi';
import { GamesTypes } from '@/utils/types/GamesTypes';
import { TracksTypes } from '@/utils/types/TracksTypes';

import { 
    createContext, useContext, useEffect, useState 
} from 'react';

const TracksContext = createContext<any>(undefined);

interface TracksContextProps {
    children: any;
}

export function TracksContextProvider({ children }:TracksContextProps) {

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ game, setGame ]       = useState<"fh5"|"fh6">("fh5");
    const [ tracks, setTracks ]   = useState<TracksTypes[]>();
    const [ activeTrack, setActiveTrack ] = useState<TracksTypes>();
    const [ error, setError ]     = useState<string>();

    async function loadTracks() {
        let trackData:GamesTypes = await LocalApi.get("games/"+game+"").then(r => r.data);
        
        if (trackData.error) {
            setError(trackData.error);
            return;
        }

        setTracks(trackData.tracks);
    }

    useEffect(() => {
        loadTracks();
    }, [])

    return (
        <TracksContext.Provider value={{ loading, setLoading, game, setGame, tracks, error, setError, activeTrack, setActiveTrack}}>
            {children}
        </TracksContext.Provider>
    );

}

export interface TracksContextTypes {
    loading: boolean;
    setLoading: (arg1: boolean) => void;
    game: string;
    setGame: (arg1: string) => void;
    tracks: TracksTypes[];
    error: string;
    activeTrack: TracksTypes;
    setActiveTrack: (arg1: TracksTypes|undefined|null) => void;
    setError: (arg1: string|null) => void;
}

export const useTracksContext = () => useContext(TracksContext);