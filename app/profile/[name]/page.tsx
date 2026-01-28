"use client";

import ErrorBox from "@/components/global/ErrorBox";
import LoadingBox from "@/components/global/LoadingBox";
import Container from "@/components/layout/Container";
import DriftGarage from "@/components/profile/DriftGarage";
import DriverStatistics from "@/components/profile/DriverStatistics";
import PublicProfileHeader from "@/components/profile/PublicProfileHeader";
import RecentDrifts from "@/components/profile/RecentDrifts";
import TrackRecords from "@/components/profile/TrackRecords";
import LocalApi from "@/services/LocalApi";
import { GarageTypes } from "@/utils/types/GarageTypes";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { RecordsTypes } from "@/utils/types/RecordsTypes";
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
    const [ recent, setRecent ]   = useState<LeadersTypes[]>([]);

    const [ records, setRecords ] = useState<RecordsTypes[]>([]);
    const [ recordClass, setRecordClass ] = useState<"a"|"s1">("a");

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
                const { 
                    stats, garage, recent, records 
                } = await LocalApi.get("/user/"+name+"/profile");
                
                setStats(stats);
                setGarage(garage);
                setRecords(records);
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
            <DriverStatistics stats={stats}/>

            <div className="">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-10 mb-20">
                        <div className="w-full lg:max-w-[350px]">
                            <TrackRecords records={records} classType={recordClass} />
                        </div>
                        <div className="flex flex-col gap-10 w-full">
                            <DriftGarage member={member} garage={garage} />

                            <RecentDrifts recent={recent} />
                        </div>
                    </div>
                </Container>
            </div>
            
        </>
    )
}