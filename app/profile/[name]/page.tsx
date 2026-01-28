"use client";

import ErrorBox from "@/components/global/ErrorBox";
import LoadingBox from "@/components/global/LoadingBox";
import DriftGarage from "@/components/profile/DriftGarage";
import DriverStatistics from "@/components/profile/DriverStatistics";
import PublicProfileHeader from "@/components/profile/PublicProfileHeader";
import RecentDrifts from "@/components/profile/RecentDrifts";
import LocalApi from "@/services/LocalApi";
import { GarageTypes } from "@/utils/types/GarageTypes";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { useEffect, useState } from "react";

type ProfileTypes = {
    params: Promise<{ name: string }>
}

export default function PublicProfile({ params }: ProfileTypes) {

    const [ mounted, setMounted ] = useState<boolean>();
    const [ error, setError ]     = useState<string>();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ member, setMember ]   = useState<UsersTypes>();
    const [ garage, setGarage ]   = useState<GarageTypes[]>();
    const [ stats, setStats ]     = useState<any>([]);
    const [ recent, setRecent ]     = useState<LeadersTypes[]>([]);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function getUserData() {
            setLoading(true);

            const { name } = await params;

            try {
                const user:UsersTypes = await LocalApi.get("/user/" + name);
                setMember(user);
            } catch (err:any) {
                setError(err.response.data.error);
                setLoading(false);
                return;
            }

            try {
                const [ stats, garage, recent ] = await Promise.all([
                    LocalApi.get("/user/"+name+"/stats"),
                    LocalApi.get("/user/"+name+"/garage"),
                    LocalApi.get("/user/"+name+"/recent"),
                ]);
                
                setStats(stats);
                setGarage(garage);
                setRecent(recent);
                setLoading(false);
            } catch(err:any) {
                setError(err.message);
                setLoading(false);
            }
        }

        getUserData();
    },// eslint-disable-next-line 
    [mounted]);
    
    if (loading) {
        return <LoadingBox message={"Fetching profile"} />
    }

    if (error) {
        return <ErrorBox message={error} />
    }

    return(
        <>
            <PublicProfileHeader member={member} />
            <hr className="border-border"/>
            <DriverStatistics stats={stats}/>
            <RecentDrifts recent={recent} />
            <DriftGarage member={member} garage={garage} />
        </>
    )
}