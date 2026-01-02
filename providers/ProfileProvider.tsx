'use client'

import LocalApi from '@/services/LocalApi';
import { CarsDetailsTypes } from '@/utils/types/CarsDetailsTypes';
import { UsersTypes } from '@/utils/types/UsersTypes';
import { createContext, useContext, useEffect, useState } from 'react';

const ProfileContext = createContext<any>(undefined);

interface ProfileContextProps {
    children: any;
}

export function ProfileContextProvider({ children }:ProfileContextProps) {

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ profile, setProfile ] = useState<UsersTypes>();
    const [ mounted, setMounted ] = useState<boolean>(false);

    const [ selectedCar, setSelectedCar ]   = useState<CarsDetailsTypes|undefined>();
    const [ error, setError ]               = useState<string>();
    const [ showBanner, setShowBanner ]     = useState<boolean>(false);

    useEffect(() => setMounted(true), []);
    
    useEffect(() => {
        if (!mounted) {
            return;
        }
        loadProfile();
    }, [mounted])
    
    async function loadProfile() {
        const userData:UsersTypes = await LocalApi.get("/profile").then(r => r.data);
        setProfile(userData);
    }

    const updateProfile = async(formData:any[]) => {
        try {
            setLoading(true);
            // post request to update endpoint
            let result:any = await LocalApi.post("profile", formData).then(r => r.data);

            if (result.error) {
                setError(result.error);
                return;
            }

            const account_data:UsersTypes = result.account;

            if (result.success) {
                setShowBanner(true); 
                setTimeout(() => setShowBanner(false), 2500);
                console.log(result)
                setProfile(account_data);
                setSelectedCar(undefined);
                setLoading(false);
            }
        } catch (e:any) {
            console.error(e);
        }
    }

    return (
        <ProfileContext.Provider value={{ 
            loading, setLoading, profile, setProfile, updateProfile, selectedCar, setSelectedCar, error, setError, 
            showBanner, setShowBanner
        }}>
            {children}
        </ProfileContext.Provider>
    );

}

export interface ProfileContextTypes {
    profile: UsersTypes;
    setProfile: (arg1: UsersTypes) => void,
    updateProfile: (arg1: any[]) => void,
    loading: boolean;
    setLoading: (arg1: boolean) => void;
    selectedCar: CarsDetailsTypes;
    setSelectedCar: (arg1: CarsDetailsTypes|undefined) => void;
    error: string;
    setError: (arg1: string) => void;
    showBanner: boolean;
    setShowBanner: (arg1: boolean) => void;
}

export const useProfileContext = () => useContext(ProfileContext);