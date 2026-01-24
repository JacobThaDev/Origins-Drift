"use client";

import ErrorBox from "@/components/global/ErrorBox";
import LoadingBox from "@/components/global/LoadingBox";
import DriverStatistics from "@/components/profile/DriverStatistics";
import PublicProfileHeader from "@/components/profile/PublicProfileHeader";
import LocalApi from "@/services/LocalApi";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { useEffect, useState } from "react";

export default function PublicProfile({ params }: { params: Promise<{ name: string }>}) {

    const [ mounted, setMounted ] = useState<boolean>();
    const [ error, setError ]     = useState<string>();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ member, setMember ]   = useState<UsersTypes>();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function getUserData() {
            setLoading(true);

            const { name } = await params;
            const result:UsersTypes = await LocalApi.get("/user/"+name);

            if (result.error) {
                setError(result.error);
                setLoading(false);
                return;
            }
            
            setMember(result);
            setLoading(false);
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
            <PublicProfileHeader member={member}/>
            <DriverStatistics member={member}/>
        </>
    )
}