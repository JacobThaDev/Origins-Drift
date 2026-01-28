'use client'

import LocalApi from '@/services/LocalApi';
import { GarageTypes } from '@/utils/types/GarageTypes';
import { createContext, useContext, useEffect, useState } from 'react';

const GarageContext = createContext<any>(undefined);

interface GarageContextProps {
    children: any;
}

export function GarageContextProvider({ children }:GarageContextProps) {

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ garage, setGarage ]   = useState<GarageTypes[]>([]);
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ makes, setMakes ]     = useState<string[]>([]);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        loadGarage();
    }, [mounted])

    async function loadGarage() {
        setLoading(true);
        const car_details:GarageTypes[] = await LocalApi.get("/garage");
        const makes:string[] = [];

        car_details.map((car:GarageTypes) => {
            if (!makes.includes(car.CarData.make)) {
                makes.push(car.CarData.make);
            }
        });

        setGarage(car_details);
        setMakes(makes);
        setLoading(false);
    }
    
    return (
        <GarageContext.Provider value={{ garage, makes, loading, setLoading, loadGarage, setGarage }}>
            {children}
        </GarageContext.Provider>
    );

}

export interface GarageContextTypes {
    garage: GarageTypes[];
    setGarage: (arg1: GarageTypes[]|undefined) => void;
    makes: string[];
    loading: boolean;
    setLoading: (arg1: boolean) => void;
    loadGarage: () => Promise<GarageTypes[]>;
}

export const useGarageContext = () => useContext(GarageContext);