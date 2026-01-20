'use client'

import { client } from '@/lib/auth-client';
import LocalApi from '@/services/LocalApi';
import { CarsDetailsTypes } from '@/utils/types/CarsDetailsTypes';
import { SessionsTypes } from '@/utils/types/SessionsTypes';
import { UsersTypes } from '@/utils/types/UsersTypes';
import { createContext, useContext, useEffect, useState } from 'react';

const ProfileContext = createContext<any>(undefined);

interface ProfileContextProps {
    children: any;
}

export function ProfileContextProvider({ children }:ProfileContextProps) {

    const [ loading, setLoading ] = useState<boolean>(true);
    const { data, isPending } = client.useSession();

    const [ session, setSession ] = useState<SessionsTypes|null>();
    const [ profile, setProfile ] = useState<UsersTypes>();

    const [ selectedCar, setSelectedCar ] = useState<CarsDetailsTypes|undefined>();
    const [ error, setError ]             = useState<string>();
    const [ showBanner, setShowBanner ]   = useState<boolean>(false);

    useEffect(() => {
        if (!data) {
            if (!isPending) {
                setLoading(false);
            }
            return;
        }

        const session = data as unknown as SessionsTypes;

        setSession(session);
        setProfile(session.user);
        setLoading(false);
    }, [data, isPending]);

    const updateProfile = async(formData:any[]) => {
        try {
            // post request to update endpoint
            let result:any = await LocalApi.post("/profile", formData);

            if (result.error) {
                setError(result.error);
                return;
            }

            const account_data:UsersTypes = result.account;

            if (result.success) {
                setShowBanner(true); 
                setTimeout(() => {
                    setShowBanner(false);
                    setLoading(false);
                }, 2500);
                setProfile(account_data);
                setSelectedCar(undefined);
            } else {
                if (result.error) {
                    setError(result.error);
                }
            }
        } catch (e:any) {
            console.error(e);
        }
    }

    return (
        <ProfileContext.Provider value={{ 
            loading, setLoading, profile, setProfile, updateProfile, selectedCar, setSelectedCar, error, setError, 
            showBanner, setShowBanner, session, setSession, isPending
        }}>
            {children}
        </ProfileContext.Provider>
    );

}

export interface ProfileContextTypes {
    profile: UsersTypes;
    setProfile: (arg1: UsersTypes|undefined|null) => void,
    updateProfile: (arg1: any[]) => void,
    loading: boolean;
    setLoading: (arg1: boolean) => void;
    selectedCar: CarsDetailsTypes;
    setSelectedCar: (arg1: CarsDetailsTypes|undefined) => void;
    error: string;
    setError: (arg1: string) => void;
    showBanner: boolean;
    setShowBanner: (arg1: boolean) => void;
    session?: SessionsTypes;
    setSession: (arg1: SessionsTypes|null|undefined) => void;
    isPending: boolean;
}

export const useProfileContext = () => useContext(ProfileContext);