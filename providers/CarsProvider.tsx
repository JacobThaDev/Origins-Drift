'use client'

import LocalApi from '@/services/LocalApi';
import { CarsDetailsTypes } from '@/utils/types/CarsDetailsTypes';
import { CarsTypes } from '@/utils/types/CarsTypes';
import { createContext, useContext, useEffect, useState } from 'react';

const CarsContext = createContext<any>(undefined);

interface CarsContextProps {
    children: any;
}

export function CarsContextProvider({ children }:CarsContextProps) {

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ cars, setCars ]       = useState<CarsDetailsTypes[]>();
    const [ makes, setMakes ]     = useState<string[]>();
    const [ mounted, setMounted ] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        loadCars();
    }, [mounted])

    async function loadCars() {
        setLoading(true);
        const car_details:CarsDetailsTypes[] = await LocalApi.get("cars").then(r => r.data);
        const makes:string[] = [];

        car_details.map((car:CarsDetailsTypes) => {
            if (!makes.includes(car.make)) {
                makes.push(car.make);
            }
        });

        setCars(car_details);
        setMakes(makes);
        setLoading(false);
    }
    

    return (
        <CarsContext.Provider value={{ cars, makes, loading, setLoading }}>
            {children}
        </CarsContext.Provider>
    );

}

export interface CarsContextTypes {
    cars: CarsDetailsTypes[];
    makes: string[];
    loading: boolean;
    setLoading: (arg1: boolean) => void;
}

export const useCarsContext = () => useContext(CarsContext);